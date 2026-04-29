document.addEventListener("DOMContentLoaded", () => {
  const greetingText = document.getElementById("greeting");

  var getCurrentGreeting = () => {
    const currentHour = new Date().getHours();

    if (currentHour <= 5 && currentHour < 12) {
      return "Good Morning, Tom!";
    } else if (currentHour >= 12 && currentHour < 18) {
      return "Good Afternoon, Tom!";
    } else {
      return "Good Evening, Tom!";
    }
  };

  var updateGreeting = () => {
    const greeting = getCurrentGreeting();
    greetingText.textContent = greeting;
  };

  updateGreeting();
  setInterval(updateGreeting, 60000);

  const searchForm = document.querySelector(".search");
  searchForm.addEventListener("submit", () => {
    setTimeout(() => {
      searchForm.reset();
    }, 250);
  });

  const items = document.querySelectorAll(".dropdownBtn");

  items.forEach(item => {
    item.addEventListener("click", function (e) {
      e.stopPropagation();
      this.classList.toggle("open");
      items.forEach(other => {
        if (other !== this) {
          other.classList.remove("open");
        }
      });
    });
    document.querySelectorAll(".dropdownMenu").forEach(menu => {
      menu.addEventListener("click", function (e) {
        e.stopPropagation();
      });
    });
  });
  document.addEventListener("click", function () {
    items.forEach(item => item.classList.remove("open"));
  });

  function getWeatherIcon(code) {
    if (code === 0) return "☀️"; // clear sky
    if (code <= 2) return "⛅"; // partly cloudy
    if (code === 3) return "☁️"; // overcast
    if (code <= 49) return "🌫️"; // fog/mist
    if (code <= 59) return "🌦️"; // drizzle
    if (code <= 69) return "🌧️"; // rain
    if (code <= 79) return "❄️"; // snow
    if (code <= 82) return "🌧️"; // showers
    if (code <= 86) return "🌨️"; // snow showers
    if (code <= 99) return "⛈️"; // thunderstorm
    return "🌡️";
  }

  async function getWeather() {
    const res = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=50.8&longitude=-0.4&current_weather=true&wind_speed_unit=mph",
    );
    const data = await res.json();
    const { temperature, windspeed, weathercode } = data.current_weather;
    const icon = getWeatherIcon(weathercode);

    document.getElementById("condition").textContent = `Condition: ${icon}`;
    document.getElementById("temp").textContent =
      `: ${parseInt(temperature)}°C`;
    document.getElementById("wind").textContent = `: ${parseInt(windspeed)} mph`;
  }

  getWeather();
});
