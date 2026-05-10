import Fuse from "fuse.js";
document.addEventListener("DOMContentLoaded", () => {
  const greetingText = document.getElementById("greeting");

  var getCurrentGreeting = () => {
    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 12) {
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

  items.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.stopPropagation();
      this.classList.toggle("open");
      items.forEach((other) => {
        if (other !== this) {
          other.classList.remove("open");
        }
      });
    });
    document.querySelectorAll(".dropdownMenu").forEach((menu) => {
      menu.addEventListener("click", function (e) {
        e.stopPropagation();
      });
    });
  });
  document.addEventListener("click", function () {
    items.forEach((item) => item.classList.remove("open"));
  });

  async function getWeather() {
    const API_KEY = "c2966e28064b8dd33cc823e6383a3cca";
    const city = "Brighton";
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`,
    );

    const data = await res.json();
    const windSpeedMPH = (data.wind.speed * 2.237).toFixed(1);
    document.getElementById("location").textContent = data.name;
    document.getElementById("temp").textContent =
      `${parseInt(data.main.temp)}°C`;
    document.getElementById("wind").textContent = `${windSpeedMPH} mph`;
  }

  getWeather();

  const allLinks = [...document.querySelectorAll(".dropdownMenu a")].map(
    (a) => ({
      name: a.textContent.trim(),
      url: a.href,
      element: a,
    }),
  );

  const fuse = new Fuse(allLinks, {
    keys: ["name"],
    threshold: 0.4,
  });

  const searchInput = document.querySelector('#search'); // adjust to your selector
  const defaultPlaceholder = 'Search...';
  
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim();
  
    if (!query) {
      searchInput.placeholder = defaultPlaceholder;
      return;
    }
  
    const results = fuse.search(query);
    searchInput.placeholder = results.length > 0 ? results[0].item.name : defaultPlaceholder;
  });
  
  searchInput.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter') return;
  
    const results = fuse.search(searchInput.value.trim());
    if (results.length > 0) {
      window.open(results[0].item.url, '_blank');
      searchInput.value = '';
      searchInput.placeholder = defaultPlaceholder;
    }
  });
});
