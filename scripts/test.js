document.addEventListener("DOMContentLoaded", () => {
    fetchWeatherData();
  });
  
  async function fetchWeatherData() {
    try {
      const url = "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.419&hourly=temperature_2m";
      const response = await fetch(url);
      const data = await response.json();
  
      const times = data.hourly.time;
      const temperatures = data.hourly.temperature_2m;
      const tableBody = document.querySelector("#content");
  
      for (let i = 0; i < times.length; i++) {
        const row = document.createElement("tr");
  
        const timeCell = document.createElement("td");
        timeCell.textContent = times[i];
  
        const tempCell = document.createElement("td");
        tempCell.textContent = temperatures[i] + " °C";
  
        row.appendChild(timeCell);
        row.appendChild(tempCell);
        tableBody.appendChild(row);
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  }