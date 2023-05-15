var map = L.map("map").setView([52.18017550538183, 21.565898029281218], 8);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

var szkola = L.marker([52.18621387347515, 21.573400045855074])
  .addTo(map)
  .bindPopup("SZKOŁA");

map.on("click", addMarker);

function addMarker(e) {
  var marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);

  var szkolaLatLng = szkola.getLatLng();
  var markerLatLng = marker.getLatLng();

  var tab = [
    [szkolaLatLng.lat, szkolaLatLng.lng],
    [markerLatLng.lat, markerLatLng.lng],
  ];

  var line = L.polyline(tab).addTo(map);

  var distance = szkolaLatLng.distanceTo(markerLatLng) / 1000; // konwersja na kilometry
  distance = distance.toFixed(2); // zaokrąglenie do dwóch miejsc po przecinku

  marker.bindPopup("Odległość: " + distance + " kilometrów").openPopup();
}

for (let i = 0; i <= woje.features.length - 1; i++) {
  L.geoJSON(woje.features[i]).addTo(map);
}
