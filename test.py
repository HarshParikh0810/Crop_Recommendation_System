import requests

url = "http://127.0.0.1:8000/predict"

data = {
    "nitrogen": 10,
    "phosphorus": 13,
    "potassium": 40,
    "ph": 6.2,
    "state": "KERALA",
    "district": "KOLLAM",
    "month": "October"
}

response = requests.post(url, json=data)

print("Status Code:", response.status_code)
print("Response:", response.json())
