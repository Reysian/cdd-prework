document.addEventListener("DOMContentLoaded", () => {
    fetchWeatherData();
});
  
async function fetchWeatherData() {

    const tableBody = document.querySelector("#content");

    try {
      const url = "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,snowfall,showers,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m";
      const response = await fetch(url);
      const data = await response.json();
  
      const units = data.current_units;
      const conditions = data.current;
  
      for (const [key, value] of Object.entries(conditions)) {
        const row = document.createElement("tr");
  
        const keyCell = document.createElement("td");
        keyCell.textContent = formatKey(key);
  
        const valueCell = document.createElement("td");
        valueCell.textContent = formatValue(value);

        if (units[key] !== "iso8601")
          valueCell.textContent += ' ' + units[key];

        if (key === "is_day")
          valueCell.textContent = value === 1 ? "Yes" : "No";

        if (key === "weather_code")
          valueCell.textContent = value + " (" + getCondition(value) + ")";
  
        row.appendChild(keyCell);
        row.appendChild(valueCell);
        tableBody.appendChild(row);
      }
    } catch (error) {
      tableBody.innerHTML = '<tr>Error fetching weather data.</tr>';
    }
}

function formatKey(key) {
    return key
    .replace(/_/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase());
}

function formatValue(value) {
    return value
    .toString()
    .replace(/T/g, ' ');
}

function getCondition(wmoCode) {

  let condition = "";

  switch(wmoCode) {
    case 0:
      condition = "Clear Sky";
      break;
    case 1:
      condition = "Mostly Clear Sky";
      break;
    case 2:
      condition = "Partly Cloudy";
      break;
    case 3:
      condition = "Overcast";
      break;
    case 45:
      condition = "Foggy";
      break;
    case 48:
      condition = "Foggy with Rime Fog";
      break;
    case 51:
      condition = "Light Drizzle";
      break;
    case 53:
      condition = "Moderate Drizzle";
      break;
    case 55:
      condition = "Dense Drizzle";
      break;
    case 56:
      condition = "Light Freezing Drizzle";
      break;
    case 57:
      condition = "Dense Freezing Drizzle";
      break;
    case 61:
      condition = "Light Rain";
      break;
    case 63:
      condition = "Moderate Rain";
      break;
    case 65:
      condition = "Heavy Rain";
      break;
    case 66:
      condition = "Light Freezing Rain";
      break;
    case 67:
      condition = "Heavy Freezing Rain";
      break;
    case 71:
      condition = "Light Snow";
      break;
    case 73:
      condition = "Moderate Snow";
      break;
    case 75:
      condition = "Heavy Snow";
      break;
    case 77:
      condition = "Snow Grains";
      break;
    case 80:
      condition = "Light Rain Showers";
      break;
    case 81:
      condition = "Moderate Rain Showers";
      break;
    case 82:
      condition = "Violent Rain Showers";
      break;
    case 85:
      condition = "Light Snow Showers";
      break;
    case 86:
      condition = "Heavy Snow Showers";
      break;
    case 95:
      condition = "Thunderstorm";
      break;
    case 96:
      condition = "Thunderstorm with Light Hail";
      break;
    case 99:
      condition = "Thunderstorm with Heavy Hail";
      break;
    default:
      condition = "Classification Unavailable";
  }
  return condition;
}