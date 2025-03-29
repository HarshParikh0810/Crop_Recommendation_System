import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Retrieve API key
API_KEY = os.getenv("VISUAL_CROSSING_API_KEY")

# Debugging
print("API Key from .env:", API_KEY)  # Should print the key, NOT None
