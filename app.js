let map;
let userLocation = null;
let restaurants = [
  {
    name: "Burger House",
    lat: 33.7005,
    lng: 73.0362,
    category: "Fast Food",
    rating: 4.5
  },
  {
    name: "Sweet Desserts",
    lat: 33.7050,
    lng: 73.0400,
    category: "Desserts",
    rating: 4.2
  },
  {
    name: "Italian Pizza",
    lat: 33.6950,
    lng: 73.0300,
    category: "Italian",
    rating: 4.7
  }
];

function initMap(centerLat = 33.7005, centerLng = 73.0362) {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: centerLat, lng: centerLng },
    zoom: 14
  });
}

function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      userLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      initMap(userLocation.lat, userLocation.lng);
      showNearbyRestaurants();
    });
  } else {
    alert("Geolocation not supported.");
  }
}

function calculateDistance(lat1, lng1, lat2, lng2) {
  const R = 6371; // km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;

  const a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI/180) *
    Math.cos(lat2 * Math.PI/180) *
    Math.sin(dLng/2) *
    Math.sin(dLng/2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

function showNearbyRestaurants() {
  const container = document.getElementById("restaurantContainer");
  container.innerHTML = "";

  restaurants.forEach(rest => {

    const distance = calculateDistance(
      userLocation.lat,
      userLocation.lng,
      rest.lat,
      rest.lng
    );

    if (distance <= 5) { // Show within 5km

      new google.maps.Marker({
        position: { lat: rest.lat, lng: rest.lng },
        map,
        title: rest.name
      });

      const card = `
        <div class="card">
          <div class="card-content">
            <h3>${rest.name}</h3>
            <p>${rest.category}</p>
            <p>⭐ ${rest.rating}</p>
            <p>📍 ${distance.toFixed(2)} km away</p>
            <button class="direction-btn"
              onclick="getDirections(${rest.lat}, ${rest.lng})">
              Get Directions
            </button>
          </div>
        </div>
      `;

      container.innerHTML += card;
    }
  });
}

function getDirections(destLat, destLng) {
  const url = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${destLat},${destLng}`;
  window.open(url, "_blank");
}

document.addEventListener("DOMContentLoaded", () => {
  initMap();
});