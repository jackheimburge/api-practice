async function getISSData() {
    const api_url = 'https://api.wheretheiss.at/v1/satellites/25544'
    const response = await fetch(api_url)
    const data = await response.json();
    const { latitude, longitude } = data;
    plotMap(latitude, longitude);
}

async function plotMap(lat, long) {
    var map = L.map('map').setView([lat, long], 1.5);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([lat, long]).addTo(map)
        .bindPopup(`Current Location of the ISS:<br> Latitude: ${lat.toFixed(2)}<br> Longitude: ${long.toFixed(2)}`)

}


getISSData();
