# Crop Prediction System 🌱

An intelligent system that recommends the most suitable crops based on soil and climate data using machine learning techniques.

## 📋 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Model Details](#model-details)

## 🌟 Overview

The Crop Prediction System helps farmers make data-driven decisions by recommending optimal crops based on soil characteristics and environmental conditions. Using machine learning algorithms trained on agricultural data, this system predicts the most suitable crops to maximize yield and sustainability.

## ✨ Features

- **Soil Analysis**: Process soil nutrient data (N, P, K values, pH)
- **Climate Integration**: Consider rainfall, humidity, and temperature data
- **Weather Data**: Real-time weather information from Visual Crossing API
- **Crop Recommendation**: Predict the most suitable crops based on input parameters
- **User-friendly Interface**: Easy-to-use implementation for farmers with minimal technical knowledge

## 🔧 Technologies Used

- **Programming Language**: Python 3.8+
- **Data Analysis**: Pandas, NumPy
- **Machine Learning**: Scikit-learn
- **Data Visualization**: Matplotlib, Seaborn
- **Notebook Environment**: Jupyter Notebook
- **Version Control**: Git & GitHub
- **Weather Data**: Visual Crossing Weather API
- **Data Storage**: CSV files

## 🚀 Installation

Follow these steps to set up the project on your local machine:

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/Crop_Prediction.git
   cd Crop_Prediction
   ```

2. **Install required dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Configure API Key**
   - Sign up for a Visual Crossing Weather API key at [visualcrossing.com](https://www.visualcrossing.com/)
   - Create a `.env` file in the project root and add your API key:
     ```
     VISUAL_CROSSING_API_KEY=your_api_key_here
     ```

## 💻 Usage

### Data Preparation

1. Ensure your soil data includes the following parameters:
   - Nitrogen (N) content
   - Phosphorus (P) content
   - Potassium (K) content
   - pH value
   - Temperature
   - Humidity
   - Rainfall

### Using the System

1. Open the notebook to explore the data and model:
   ```bash
   jupyter notebook notebooks/crop_model.ipynb
   ```

2. Input your location to fetch real-time weather data and soil parameters to get crop recommendations

3. Sample output:
   ```
   Based on the provided soil and climate data, the recommended crop is: Rice
   ```

## 🧠 Model Details

This system employs a Random Forest Classifier trained on a dataset of various crops and their optimal growing conditions. The model considers:

- **Input Features**: N, P, K values, pH, temperature, humidity, and rainfall
- **Output**: Predicted crop type (e.g., rice, wheat, maize, etc.)
- **Accuracy**: Approximately 97% on test data
- **Model Selection**: Various algorithms were tested, including Decision Trees, SVM, and KNN, with Random Forest performing the best

## 🔍 How It Works

1. **Data Collection**: Soil samples are collected and processed
2. **Weather Integration**: Real-time weather data is fetched from Visual Crossing API
3. **Preprocessing**: Data is cleaned, normalized, and prepared for the model
4. **Feature Analysis**: The system identifies key factors affecting crop growth
5. **Prediction**: The trained model recommends the most suitable crop
6. **Validation**: Recommendations are validated against historical yield data

---

Built with ❤️ for sustainable agriculture.
