from fastapi import FastAPI, Query
import requests
import joblib
import numpy as np
import pandas as pd
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import calendar
from datetime import datetime, timedelta
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()


app = FastAPI(
    title="Crop Prediction API",
    description="AI-powered crop recommendation system",
    version="1.0.0"
)

# CORS Configuration with dynamic origins
allowed_origins = os.getenv('ALLOWED_ORIGINS', 'http://localhost:5500').split(',')
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5500", "http://localhost:5500"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Secure API key handling
VISUAL_CROSSING_API_KEY = os.getenv('VISUAL_CROSSING_API_KEY')



# Load ML model and preprocessing tools
model = joblib.load("crop_prediction_model_final.pkl")
label_encoder = joblib.load("label_encoder_final.pkl")
scaler = joblib.load("scaler_final.pkl")


class CropInput(BaseModel):
    nitrogen: int
    phosphorus: int
    potassium: int
    ph: float
    state: str
    district: str
    month: str  # Field for month selection

def get_month_dates(month_name, year=2024):
    """
    Get start and end dates for a given month name in 2024.
    """
    # Convert month name to month number (1-12)
    month_dict = {month.lower(): i for i, month in enumerate(calendar.month_name) if i > 0}
    month_num = month_dict.get(month_name.lower(), 1)
    
    # Create start date (first day of month)
    start_date = f"{year}-{month_num:02d}-01"
    
    # Create end date (last day of month)
    if month_num == 12:
        end_date = f"{year}-12-31"
    else:
        end_date = f"{year}-{month_num+1:02d}-01"
        # Subtract one day to get the last day of the current month
        end_date = (datetime.strptime(end_date, "%Y-%m-%d") - timedelta(days=1)).strftime("%Y-%m-%d")
    
    return start_date, end_date

def get_climate_data(district, state, month):
    """
    Get 2024 climate data from Visual Crossing Weather API for a specific month
    """
    # Get start and end dates for the month in 2024
    start_date, end_date = get_month_dates(month, 2024)
    
    # Normalize inputs
    state_normalized = state.title()
    district_normalized = district.title()
    
    print(f"Fetching 2024 climate data for {district}, {state}, {month}")
    
    # Visual Crossing API endpoint for 2024 weather data
    location = f"{district_normalized},{state_normalized},India"
    url = f"https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/{location}/{start_date}/{end_date}"
    
    params = {
        "unitGroup": "metric",
        "include": "days",
        "key": VISUAL_CROSSING_API_KEY,
        "contentType": "json"
    }
    
    try:
        response = requests.get(url, params=params)
        
        if response.status_code == 200:
            data = response.json()
            
            # Calculate average temperature, humidity and precipitation from daily data
            days = data.get("days", [])
            if days:
                # Extract temperature, humidity and precipitation from each day
                temps = [day.get("temp", 0) for day in days]
                humidities = [day.get("humidity", 0) for day in days]
                
                # Get precipitation (rainfall) in mm
                # Visual Crossing provides precipitation in mm if unitGroup is metric
                precipitations = [day.get("precip", 0) for day in days]
                
                # Calculate averages
                avg_temp = sum(temps) / len(temps)
                avg_humidity = sum(humidities) / len(humidities)
                
                # For rainfall, sum all daily precipitation values for the month
                total_rainfall = sum(precipitations)
                
                return {
                    "temperature": avg_temp,
                    "humidity": avg_humidity,
                    "rainfall": total_rainfall
                }
        else:
            print(f"API Error: {response.status_code}, {response.text}")
            
    except Exception as e:
        print(f"Error fetching climate data: {str(e)}")
    
    # Return default values if API fails
    return {"temperature": None, "humidity": None, "rainfall": None}

@app.get("/weather")
def weather(district: str = Query(..., description="District name"), 
            state: str = Query(..., description="State name"),
            month: str = Query(None, description="Month name")):
    # Use current month if not specified
    if not month:
        month = calendar.month_name[datetime.now().month]
    
    if district and state:
        # Get 2024 weather for specified district, state, and month
        return get_climate_data(district, state, month)
    return {"error": "District and State are required"}

@app.get("/climate")
def climate(state: str = Query(..., description="State name"),
            district: str = Query(..., description="District name"),
            month: str = Query(..., description="Month name")):
    """Get climate data for specific state, district and month"""
    weather_data = get_climate_data(district, state, month)
    
    return {
        "state": state,
        "district": district,
        "month": month,
        "temperature": weather_data["temperature"],
        "humidity": weather_data["humidity"],
        "rainfall": weather_data["rainfall"]
    }

@app.post("/predict")
def predict(data: CropInput):
    try:
        # Get 2024 climate data for the specified month
        climate_data = get_climate_data(data.district, data.state, data.month)
        
        if climate_data["humidity"] is None or climate_data["temperature"] is None or climate_data["rainfall"] is None:
            return {"error": "Climate data not available for the specified location and month"}

        # Print fetched data for debugging
        print("========= DEBUG INFO =========")
        print(f"State: {data.state}, District: {data.district}, Month: {data.month}")
        print(f"🌡 Temperature: {climate_data['temperature']}°C")
        print(f"💧 Humidity: {climate_data['humidity']}%")
        print(f"🌧 Rainfall: {climate_data['rainfall']} mm")
        print("==============================")

        # Prepare input for model
        input_features = np.array([[data.nitrogen, data.phosphorus, data.potassium,
                                    climate_data["temperature"], data.ph,
                                    climate_data["humidity"], climate_data["rainfall"]]])
        input_scaled = scaler.transform(input_features)

        # Predict crop
        predicted_crop = model.predict(input_scaled)
        crop_name = label_encoder.inverse_transform(predicted_crop)

        return {
            "recommended_crop": crop_name[0],
            "climate_data": {
                "temperature": climate_data["temperature"],
                "humidity": climate_data["humidity"],
                "rainfall": climate_data["rainfall"]
            }
        }
    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)