const button = document.getElementById('myButton');
var leafMap = L.map('map', {
  center: [65.004634, 25.506489],
  zoom: 12,
  layers: [
    L.tileLayer(`https://cdn.digitransit.fi/map/v3/hsl-map/{z}/{x}/{y}.png?digitransit-subscription-key=${SUBSCRIPTION_KEY}`),
  ]
});

button.addEventListener('click', () => {
  loadOuluParkingMarkers(leafMap);
});


function loadOuluParkingMarkers(map) {
    fetch("https://api.oulunliikenne.fi/proxy/graphql", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            query: `
                query GetAllCarParks {
                    carParks {
                        carParkId
                        name
                        lat
                        lon
                        maxCapacity
                        spacesAvailable
                    }
                }
            `
        })
    })
    .then(res => res.json())
    .then(json => {
        const parks = json.data.carParks;

        parks.forEach(park => {
            // Skip invalid coordinates
            if (park.lat != null && park.lon != null) {
                const marker = L.marker([park.lat, park.lon]).addTo(map);

                const popupContent = `
                    <strong>${park.name}</strong><br>
                    ID: ${park.carParkId}<br>
                    ${park.maxCapacity != null ? `Capacity: ${park.maxCapacity}<br>` : 'Open space. No data available.'}
                    ${park.spacesAvailable != null ? `Available: ${park.spacesAvailable}<br>` : ''}
                `;
                marker.bindPopup(popupContent);
            }
        });
    })
    .catch(err => {
        console.error("Failed to fetch Oulun parking data:", err);
    });
}

function getQueryParams() {
  // Gets the part after ? in url when redirecting from second page.
  const urlParams = new URLSearchParams(window.location.search);
  // Returns parsed data. example: { lat: 65.0112, lon: 25.4919 }
  return {
      lat: parseFloat(urlParams.get('lat')),
      lon: parseFloat(urlParams.get('lon'))
  };
}

// Getting the return from getQueryParams and assigning them to lat and long.
const { lat, lon } = getQueryParams();

// Validates the values
if (!isNaN(lat) && !isNaN(lon)) {
  // Zoom to the parking spot and add a marker
  leafMap.setView([lat, lon], 17);
  // Set a marker to the lat/lon
  const marker = L.marker([lat, lon]).addTo(leafMap);
  marker.bindPopup("Selected Parking").openPopup();
  loadOuluParkingMarkers(leafMap)
}

