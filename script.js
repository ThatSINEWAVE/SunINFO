// Get user's location using the GeoJS API
fetch('https://get.geojs.io/v1/ip/geo.js')
    .then(response => response.text()) // Fetch response as text (not JSON)
    .then(data => {
        // Parse the JavaScript object from the response (it's wrapped in a function call)
        const geoData = JSON.parse(data.substring(data.indexOf('(') + 1, data.lastIndexOf(')')));

        const { latitude, longitude, city, country } = geoData;
        document.getElementById('location').textContent = `Location: ${city}, ${country}`;

        // Fetch sunrise and sunset data using the Sunrise-Sunset API
        fetch(`https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}`)
            .then(response => response.json())
            .then(sunData => {
                if (sunData.status === "OK") {
                    const { sunrise, sunset, civil_twilight_begin, civil_twilight_end, nautical_twilight_begin, nautical_twilight_end, astronomical_twilight_begin, astronomical_twilight_end } = sunData.results;

                    // Set the sunrise and sunset times
                    document.getElementById('sunrise').textContent = `Sunrise: ${sunrise}`;
                    document.getElementById('sunset').textContent = `Sunset: ${sunset}`;

                    // Set the twilight times
                    document.getElementById('civil-twilight').textContent = `Civil Twilight: Begin: ${civil_twilight_begin} / End: ${civil_twilight_end}`;
                    document.getElementById('nautical-twilight').textContent = `Nautical Twilight: Begin: ${nautical_twilight_begin} / End: ${nautical_twilight_end}`;
                    document.getElementById('astronomical-twilight').textContent = `Astronomical Twilight: Begin: ${astronomical_twilight_begin} / End: ${astronomical_twilight_end}`;
                } else {
                    console.error("Failed to get sunrise/sunset data.");
                }
            })
            .catch(err => console.error("Error fetching sunrise-sunset data:", err));
    })
    .catch(err => console.error("Error fetching location data:", err));
