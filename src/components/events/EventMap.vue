<template>
  <div class="m-2" style="border: 1px solid var(--bs-border-color-translucent)">
    <div id="map" ref="map"></div>
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";

export default {
  name: "EventMap",
  data() {
    return {
      map: {},
      markers: [],
    };
  },
  props: {
    events: {
      type: Object,
      required: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    zoom: {
      type: Number,
      required: true,
    },
    showInMapEvent: {
      type: Object,
      required: false,
    },
  },
  methods: {
    createMap() {
      // Initialize the map
      this.map = L.map(this.$refs.map).setView(
        [this.latitude, this.longitude],
        this.zoom
      );
      // Add the tile layer
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(this.map);
      //Set URLs for Leaflet marker icons
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
        iconUrl: require("leaflet/dist/images/marker-icon.png"),
        shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
      });
    },
    addMarkers() {
      this.events.map((e) => {
        let marker = L.marker([e.coordinateX, e.coordinateY]).addTo(this.map);
        marker.bindPopup("<b>" + e.title + "</b><br>" + e.locationDetails);
        // Add popup close event
        marker.on("popupclose", () => {
          this.$emit("popup-closed");
        });
        this.markers.push(marker);
      });
    },
    removeMarkers() {
      this.markers.forEach((marker) => {
        marker.remove();
      });
      this.markers = [];
    },
  },
  mounted() {
    this.createMap();
    this.addMarkers();
  },
  watch: {
    events() {
      this.removeMarkers();
      this.addMarkers();
    },
    showInMapEvent() {
      if (this.showInMapEvent !== null) {
        // Look for the selected event marker
        const selectedMarker = this.markers.find((marker) => {
          return (
            marker.getLatLng().lat === this.showInMapEvent.coordinateX &&
            marker.getLatLng().lng === this.showInMapEvent.coordinateY
          );
        });
        // If found, open its popup
        if (selectedMarker) {
          selectedMarker.openPopup();
        }
      }
    },
  },
};
</script>

<style scoped>
#map {
  height: 500px;
}
</style>
