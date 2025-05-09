const button = document.querySelector("#submit");
const latField = document.getElementById('latitude');
const lonField = document.getElementById('longitude');

button.onclick = function() {
  sessionStorage.setItem('lat', latField.value);
  sessionStorage.setItem('lon', lonField.value);
};

document.addEventListener("DOMContentLoaded", () => {
    fetchWeatherData();
});


async function fetchWeatherData() {

  const chartHeader = document.querySelector("#header");
  const params = new URLSearchParams(window.location.search);
  if (params.size) {
    lat = params.get('lat') || '52.52';
    lon = params.get('lon') || '13.41';
    console.log("if");
  } else {
    lat = sessionStorage.getItem('lat') || '52.52';
    lon = sessionStorage.getItem('lon') || '13.41';
    console.log("else");
  }

  chartHeader.innerText += " at " + lat + " and " + lon;

  try {
    const url = "https://api.open-meteo.com/v1/forecast?latitude=" + lat + "&longitude=" + lon + "&hourly=temperature_2m";
    const response = await fetch(url);
    const data = await response.json();

    const times = data.hourly.time;
    const temperatures = data.hourly.temperature_2m;
    const tableBody = document.querySelector("#content");

    let ctx = document.querySelector("#chart").getContext("2d");

    let chartTimes = times.map(function(x){return x.replace(/T/g, '\n').slice(5)});
    let tableTimes = times.map(function(x){return x.replace(/T/g, ' ');});

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: chartTimes,
        datasets: [{
          label: "Temperature (°C)",
          data: temperatures,
          backgroundColor: "rgba(1, 164, 205, 0.42)",
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          xAxes: [{
            ticks: {
              maxTicksLimit: 7
            }
          }]
        }
      }
    });

    for (let i = 0; i < times.length; i++) {
      const row = document.createElement("tr");
  
      const timeCell = document.createElement("td");
      timeCell.textContent = tableTimes[i];
  
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