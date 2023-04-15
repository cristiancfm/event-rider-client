import L from "leaflet";

export default function createMap(map, latitude, longitude, zoom) {
  map = L.map("map").setView([latitude, longitude], zoom);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);
}
