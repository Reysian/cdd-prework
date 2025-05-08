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

      let ctx = document.querySelector("#chart").getContext("2d");

      var hours = times.map(function(x){return x.split('T')[1] === "00:00" ? x.replace(/T/, ' ') : x.split('T')[1];});

      new Chart(ctx, {
        type: 'line',
        data: {
          labels: hours,
          datasets: [{
            label: "Temperature",
            data: temperatures,
            backgroundColor: "rgba(1, 140, 205, 0.6)",
            borderWidth: 1
          }]
        }
      });
  
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