// Constants and configuration
const API_BASE_URL = 'https://crop-recommendation-system-0ye7.onrender.com'; // Your deployed FastAPI URL
const MONTHS = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

// State-district mapping (for 4 example states)
const STATE_DISTRICTS = {
    "Andhra Pradesh": [
      "Anantapur",
      "Chittoor",
      "East Godavari",
      "Guntur",
      "Krishna",
      "Kurnool",
      "Visakhapatnam"
    ],
    "Arunachal Pradesh": [
      "Changlang",
      "East Siang",
      "Lohit",
      "Papum Pare",
      "Tawang",
      "Tirap",
      "West Kameng"
    ],
    "Assam": [
      "Barpeta",
      "Cachar",
      "Dibrugarh",
      "Jorhat",
      "Kamrup",
      "Nagaon",
      "Tinsukia"
    ],
    "Bihar": [
      "Gaya",
      "Muzaffarpur",
      "Nalanda",
      "Patna",
      "Purnia",
      "Saran",
      "Vaishali"
    ],
    "Chhattisgarh": [
      "Bastar",
      "Bilaspur",
      "Durg",
      "Jashpur",
      "Korba",
      "Raipur",
      "Rajnandgaon"
    ],
    "Goa": [
      "North Goa",
      "South Goa"
    ],
    "Gujarat": [
      "Ahmedabad",
      "Bharuch",
      "Gandhinagar",
      "Jamnagar",
      "Rajkot",
      "Surat",
      "Vadodara"
    ],
    "Haryana": [
      "Ambala",
      "Faridabad",
      "Gurugram",
      "Hisar",
      "Karnal",
      "Panipat",
      "Rohtak"
    ],
    "Himachal Pradesh": [
      "Chamba",
      "Hamirpur",
      "Kangra",
      "Kullu",
      "Mandi",
      "Shimla",
      "Una"
    ],
    "Jharkhand": [
      "Bokaro",
      "Dhanbad",
      "Hazaribagh",
      "Jamshedpur",
      "Ranchi",
      "Palamu",
      "Ramgarh"
    ],
    "Karnataka": [
      "Bangalore Urban",
      "Belgaum",
      "Dakshina Kannada",
      "Dharwad",
      "Mysore",
      "Shimoga",
      "Tumkur"
    ],
    "Kerala": [
      "Ernakulam",
      "Kannur",
      "Kozhikode",
      "Malappuram",
      "Thiruvananthapuram",
      "Thrissur",
      "Wayanad"
    ],
    "Madhya Pradesh": [
      "Bhopal",
      "Gwalior",
      "Indore",
      "Jabalpur",
      "Rewa",
      "Sagar",
      "Ujjain"
    ],
    "Maharashtra": [
      "Aurangabad",
      "Mumbai",
      "Nagpur",
      "Nashik",
      "Pune",
      "Thane",
      "Solapur"
    ],
    "Manipur": [
      "Bishnupur",
      "Chandel",
      "Churachandpur",
      "Imphal East",
      "Imphal West",
      "Senapati",
      "Thoubal"
    ],
    "Meghalaya": [
      "East Khasi Hills",
      "East Jaintia Hills",
      "North Garo Hills",
      "Ri Bhoi",
      "South Garo Hills",
      "West Garo Hills",
      "West Khasi Hills"
    ],
    "Mizoram": [
      "Aizawl",
      "Champhai",
      "Kolasib",
      "Lawngtlai",
      "Lunglei",
      "Mamit",
      "Serchhip"
    ],
    "Nagaland": [
      "Dimapur",
      "Kohima",
      "Mokokchung",
      "Mon",
      "Phek",
      "Tuensang",
      "Wokha"
    ],
    "Odisha": [
      "Balasore",
      "Cuttack",
      "Ganjam",
      "Khordha",
      "Puri",
      "Sambalpur",
      "Sundargarh"
    ],
    "Punjab": [
      "Amritsar",
      "Jalandhar",
      "Ludhiana",
      "Patiala",
      "Mohali",
      "Bathinda",
      "Hoshiarpur"
    ],
    "Rajasthan": [
      "Ajmer",
      "Alwar",
      "Bikaner",
      "Jaipur",
      "Jodhpur",
      "Kota",
      "Udaipur"
    ],
    "Sikkim": [
      "East Sikkim",
      "North Sikkim",
      "South Sikkim",
      "West Sikkim"
    ],
    "Tamil Nadu": [
      "Chennai",
      "Coimbatore",
      "Madurai",
      "Salem",
      "Thanjavur",
      "Tirunelveli",
      "Vellore"
    ],
    "Telangana": [
      "Adilabad",
      "Hyderabad",
      "Karimnagar",
      "Khammam",
      "Medak",
      "Nalgonda",
      "Warangal"
    ],
    "Tripura": [
      "Dhalai",
      "Gomati",
      "Khowai",
      "North Tripura",
      "South Tripura",
      "Unakoti",
      "West Tripura"
    ],
    "Uttar Pradesh": [
      "Agra",
      "Allahabad",
      "Kanpur",
      "Lucknow",
      "Meerut",
      "Varanasi",
      "Gorakhpur"
    ],
    "Uttarakhand": [
      "Dehradun",
      "Haridwar",
      "Nainital",
      "Almora",
      "Pauri Garhwal",
      "Udham Singh Nagar",
      "Tehri Garhwal"
    ],
    "West Bengal": [
      "Darjeeling",
      "Hooghly",
      "Howrah",
      "Kolkata",
      "Murshidabad",
      "North 24 Parganas",
      "South 24 Parganas"
    ],
    "Andaman and Nicobar Islands": [
      "North and Middle Andaman",
      "South Andaman",
      "Nicobar"
    ],
    "Chandigarh": [
      "Chandigarh"
    ],
    "Dadra and Nagar Haveli and Daman and Diu": [
      "Dadra and Nagar Haveli",
      "Daman",
      "Diu"
    ],
    "Delhi": [
      "Central Delhi",
      "East Delhi",
      "New Delhi",
      "North Delhi",
      "South Delhi",
      "West Delhi"
    ],
    "Jammu and Kashmir": [
      "Anantnag",
      "Baramulla",
      "Jammu",
      "Kathua",
      "Pulwama",
      "Srinagar",
      "Udhampur"
    ],
    "Ladakh": [
      "Kargil",
      "Leh"
    ],
    "Lakshadweep": [
      "Kavaratti",
      "Agatti",
      "Amini",
      "Andrott",
      "Minicoy",
      "Kiltan"
    ],
    "Puducherry": [
      "Karaikal",
      "Mahe",
      "Puducherry",
      "Yanam"
    ]
  };

// DOM elements
let stateSelect;
let districtSelect;
let monthSelect;
let nitrogenInput;
let phosphorusInput;
let potassiumInput;
let phInput;
let predictBtn;
let resultContainer;
let loadingIndicator;
let climateInfoContainer;

// Initialize the app when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Get DOM elements
    stateSelect = document.getElementById('state');
    districtSelect = document.getElementById('district');
    monthSelect = document.getElementById('month');
    nitrogenInput = document.getElementById('nitrogen');
    phosphorusInput = document.getElementById('phosphorus');
    potassiumInput = document.getElementById('potassium');
    phInput = document.getElementById('ph');
    predictBtn = document.getElementById('predict-btn');
    resultContainer = document.getElementById('result');
    loadingIndicator = document.getElementById('loading');
    climateInfoContainer = document.getElementById('climate-info');

    // Populate the months dropdown
    populateMonths();

    // Set up event listeners
    setupEventListeners();
});

// Populate the months dropdown
function populateMonths() {
    MONTHS.forEach(month => {
        const option = document.createElement('option');
        option.value = month;
        option.textContent = month;
        monthSelect.appendChild(option);
    });
    
    // Set default month to current month
    const currentMonth = MONTHS[new Date().getMonth()];
    monthSelect.value = currentMonth;
}

// Set up event listeners
function setupEventListeners() {
    // Add event listener for state change to update districts
    stateSelect.addEventListener('change', updateDistricts);
    
    // When state, district, or month changes, fetch climate data
    stateSelect.addEventListener('change', fetchClimateData);
    districtSelect.addEventListener('change', fetchClimateData);
    monthSelect.addEventListener('change', fetchClimateData);
    
    // Predict button click
    predictBtn.addEventListener('click', predictCrop);
    
    // Initial population of districts based on default state (if any)
    updateDistricts();
}

// Update districts based on selected state
function updateDistricts() {
    const selectedState = stateSelect.value;
    
    // Clear existing options
    districtSelect.innerHTML = '<option value="">Select District</option>';
    
    // If a state is selected, populate its districts
    if (selectedState && STATE_DISTRICTS[selectedState]) {
        STATE_DISTRICTS[selectedState].forEach(district => {
            const option = document.createElement('option');
            option.value = district;
            option.textContent = district;
            districtSelect.appendChild(option);
        });
    }
}

// Fetch climate data for the selected location and month
async function fetchClimateData() {
    const state = stateSelect.value;
    const district = districtSelect.value;
    const month = monthSelect.value;
    
    if (!state || !district || !month) {
        climateInfoContainer.innerHTML = '<p>Please select state, district, and month to view climate data.</p>';
        return;
    }
    
    try {
        climateInfoContainer.innerHTML = '<p>Loading climate data...</p>';
        
        const response = await fetch(`${API_BASE_URL}/climate?state=${encodeURIComponent(state)}&district=${encodeURIComponent(district)}&month=${encodeURIComponent(month)}`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch climate data');
        }
        
        const data = await response.json();
        
        // Display climate information
        climateInfoContainer.innerHTML = `
            <div class="climate-card">
                <h3>Climate Data for ${month} in ${district}, ${state}</h3>
                <div class="climate-info">
                    <div class="climate-item">
                        <i class="fas fa-temperature-high"></i>
                        <span>Temperature: ${data.temperature ? data.temperature.toFixed(1) : 'N/A'}°C</span>
                    </div>
                    <div class="climate-item">
                        <i class="fas fa-tint"></i>
                        <span>Humidity: ${data.humidity ? data.humidity.toFixed(1) : 'N/A'}%</span>
                    </div>
                    <div class="climate-item">
                        <i class="fas fa-cloud-rain"></i>
                        <span>Rainfall: ${data.rainfall ? data.rainfall.toFixed(1) : 'N/A'} mm</span>
                    </div>
                </div>
            </div>
        `;
    } catch (error) {
        console.error('Error fetching climate data:', error);
        climateInfoContainer.innerHTML = `<p class="error">Error: ${error.message}</p>`;
    }
}

// Predict crop based on inputs
async function predictCrop() {
    const state = stateSelect.value;
    const district = districtSelect.value;
    const month = monthSelect.value;
    const nitrogen = parseInt(nitrogenInput.value);
    const phosphorus = parseInt(phosphorusInput.value);
    const potassium = parseInt(potassiumInput.value);
    const ph = parseFloat(phInput.value);
    
    // Validate inputs
    if (!state || !district || !month || isNaN(nitrogen) || isNaN(phosphorus) || isNaN(potassium) || isNaN(ph)) {
        resultContainer.innerHTML = '<p class="error">Please fill in all fields with valid values.</p>';
        return;
    }
    
    try {
        // Show loading indicator
        loadingIndicator.style.display = 'block';
        resultContainer.innerHTML = '';
        
        // Call the prediction API
        const response = await fetch(`${API_BASE_URL}/predict`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nitrogen,
                phosphorus,
                potassium,
                ph,
                state,
                district,
                month
            })
        });
        
        if (!response.ok) {
            throw new Error('Failed to get prediction');
        }
        
        const data = await response.json();
        
        if (data.error) {
            throw new Error(data.error);
        }
        
        // Display result
        resultContainer.innerHTML = `
            <div class="result-card">
                <h2>Crop Recommendation</h2>
                <div class="crop-result">
                    <i class="fas fa-seedling"></i>
                    <h3>${data.recommended_crop}</h3>
                </div>
                <div class="climate-summary">
                    <p>Based on:</p>
                    <ul>
                        <li>Nitrogen: ${nitrogen} kg/ha</li>
                        <li>Phosphorus: ${phosphorus} kg/ha</li>
                        <li>Potassium: ${potassium} kg/ha</li>
                        <li>pH: ${ph}</li>
                        <li>Temperature: ${data.climate_data.temperature.toFixed(1)}°C</li>
                        <li>Humidity: ${data.climate_data.humidity.toFixed(1)}%</li>
                        <li>Rainfall: ${data.climate_data.rainfall.toFixed(1)} mm</li>
                    </ul>
                </div>
            </div>
        `;
    } catch (error) {
        console.error('Error predicting crop:', error);
        resultContainer.innerHTML = `<p class="error">Error: ${error.message}</p>`;
    } finally {
        // Hide loading indicator
        loadingIndicator.style.display = 'none';
    }
}

// Helper function to format numbers
function formatNumber(num) {
    return num.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}
