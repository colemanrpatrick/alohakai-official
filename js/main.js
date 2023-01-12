// Initialize and add the map
function initMap() {
  // The location of Uluru
  const sealifepark = { lat: 21.3137242, lng: -157.6636201 };
  // The map, centered at Uluru
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 16,
    center: sealifepark,
    mapTypeId: 'hybrid'
  });
  // The marker, positioned at Uluru
  const marker = new google.maps.Marker({
    position: sealifepark,
    map: map,
  });
}

window.initMap = initMap;
