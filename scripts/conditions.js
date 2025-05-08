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
        keyCell.textContent = formatText(key);
  
        const valueCell = document.createElement("td");
        valueCell.textContent = value + ' ' + units[key];
  
        row.appendChild(keyCell);
        row.appendChild(valueCell);
        tableBody.appendChild(row);
      }
    } catch (error) {
      tableBody.innerHTML = '<tr>Error fetching weather data.</tr>';
    }
}

function formatText(text) {
    return text.replace(/_/g, ' ');
}