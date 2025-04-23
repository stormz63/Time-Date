    const dateElement = document.getElementById('date');
    const timeElement = document.getElementById('time');
    const locationElement = document.getElementById('location');
    const worldBtn = document.getElementById('worldBtn');
    const settingsBtn = document.getElementById('settingsBtn');
    const modal = document.getElementById('worldModal');
    const closeModalBtn = document.querySelector('.close-btn');
    const worldTimesList = document.getElementById('worldTimes');

    function updateDateTime() {
      const now = new Date();
      const options = { month: 'long', day: 'numeric', year: 'numeric' };
      dateElement.textContent = now.toLocaleDateString('en-US', options);
      timeElement.textContent = now.toLocaleTimeString();
    }
    setInterval(updateDateTime, 1000);
    updateDateTime();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          locationElement.textContent = `Lat: ${position.coords.latitude.toFixed(2)}, Lon: ${position.coords.longitude.toFixed(2)}`;
        },
        () => {
          locationElement.textContent = "Location access denied";
        }
      );
    } else {
      locationElement.textContent = "Geolocation not supported";
    }

    if (worldBtn) {
      worldBtn.addEventListener('click', () => {
        modal.classList.remove('hidden');
        populateWorldTime();
      });
    }

    if (closeModalBtn) {
      closeModalBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
      });
    }

    function populateWorldTime() {
      const cities = ['New York', 'London', 'Tokyo', 'Sydney'];
      worldTimesList.innerHTML = '';
      cities.forEach((city) => {
        const li = document.createElement('li');
        const time = new Date().toLocaleString('en-US', { timeZone: getTimeZone(city) });
        li.textContent = `${city}: ${time}`;
        worldTimesList.appendChild(li);
      });
    }

    function getTimeZone(city) {
      const timeZones = {
        'New York': 'America/New_York',
        'London': 'Europe/London',
        'Tokyo': 'Asia/Tokyo',
        'Sydney': 'Australia/Sydney',
      };
      return timeZones[city] || 'UTC';
    }