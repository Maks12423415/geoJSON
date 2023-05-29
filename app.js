var map = L.map("map").setView([52.18017550538183, 21.565898029281218], 8);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

var szkola = L.marker([52.18621387347515, 21.573400045855074])
  .addTo(map)
  .bindPopup("Home the place where I can go");

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

  var distance = szkolaLatLng.distanceTo(markerLatLng) / 1000; // Conwertion to kilometers.
  distance = distance.toFixed(2); // Rounded to two decimal places.

  marker.bindPopup("Distance: " + distance + " Kilometers").openPopup();
}

var tabwoje = [];
var warstwy = [];
for (let i = 0; i <= woje.features.length - 1; i++) {
  var wojew = L.geoJSON(woje.features[i], { color: "blue" }).addTo(map);
  wojew.nazwa = woje.features[i].properties.nazwa;
  warstwy.push(wojew);

  wojew.on("click", showName);
  wojew.on("mouseover", setColor);
  wojew.on("mouseout", setColorPrev);
  tabwoje.push(woje.features[i].properties.nazwa);
}
function showName(e) {
  console.log(e.layer.feature.properties.nazwa);
}
//Utworzenie nadaje color całej siatce (geoJSON).
function setColor(e) {
  //"this" odwołuje sie do całej funkcji
  this.setStyle({
    color: "red",
  });
}

function setColorPrev(e) {
  this.setStyle({
    color: "blue",
  });
}

console.log(tabwoje);

function randomWoje() {
  var index = Math.floor(Math.random() * tabwoje.length);
  var item = tabwoje[index];
  console.log(item);
  wylosowanyKolor(item);
  if (tabwoje.length > 0) {
    document.getElementById("wylosowanie").innerHTML = item;
  } else {
    document.getElementById("wylosowane").innerHTML = "wylosowane wszystkie";
  }

  tabwoje.splice(index, 1);
}

function wylosowanyKolor(nazwa) {
  for (let i = 0; i <= warstwy.length - 1; i++) {
    if (nazwa == warstwy[i].nazwa) {
      warstwy[i].setStyle({ color: "red" });
    }
  }
}
