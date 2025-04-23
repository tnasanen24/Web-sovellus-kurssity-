const parking = document.getElementById('parkingHouses');

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

    parking.innerHTML = parks.map(park => `
        <div 
            class="parking-box" 
            data-lat="${park.lat}" 
            data-lon="${park.lon}" 
            onclick="redirectToMap(this)"
            <strong>${park.name}</strong><br>
            ID: ${park.carParkId}<br>
            Lat: ${park.lat}<br> 
            Lon: ${park.lon}<br>
            ${park.maxCapacity != null ? `Capacity: ${park.maxCapacity}<br>` : 'Open space.<br>No information.'}
            ${park.spacesAvailable != null ? `Available: ${park.spacesAvailable}<br>` : ''}
        </div>
    `).join('');
})
.catch(err => {
    console.error(err);
    parking.innerHTML = "Failed to load parking data!";
});

function redirectToMap(element) {
    const lat = element.getAttribute('data-lat');
    const lon = element.getAttribute('data-lon');
    window.location.href = `index.html?lat=${lat}&lon=${lon}`;
}