<template>
  <div class="text-start p-2">
    <h2 class="m-2">{{ title }}</h2>
    <EventFilters ref="eventFilters" @filters-applied="applyFilters" />
    <div class="row">
      <div class="col-sm-12 col-md-8">
        <div class="d-flex flex-wrap justify-content-start">
          <div
            class="col-sm-12 col-md-6 col-xxl-4"
            v-for="event in events"
            :key="event.id"
          >
            <EventCard
              :event="event"
              @subscribers="updateSubscribers"
              @saves="updateSaves"
              @show-in-map="showEventInMap"
            ></EventCard>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <EventMap
          v-if="events.length > 0"
          :events="events"
          :latitude="this.latitude"
          :longitude="this.longitude"
          :zoom="13"
          :show-in-map-event="showInMapEvent"
          @popup-closed="popupClosed"
        ></EventMap>
      </div>
    </div>
    <div v-if="events.length === 0" class="text-center mt-2">
      <img
        src="../../../public/event-rider-logo-alt.png"
        style="opacity: 10%; filter: grayscale(100%)"
        alt=""
      />
      <h2>No Events</h2>
    </div>
  </div>
</template>

<script>
import EventFilters from "@/components/events/EventFilters.vue";
import EventCard from "@/components/events/EventCard.vue";
import { updateSubscribers, updateSaves } from "@/common/event";
import EventMap from "@/components/events/EventMap.vue";

export default {
  name: "EventsView",
  props: {
    title: {
      // the title to show in the component
      type: String,
      required: true,
    },
    getEvents: {
      // the function to retrieve the events
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      events: [],
      latitude: null,
      longitude: null,
      showInMapEvent: null,
    };
  },
  components: { EventFilters, EventCard, EventMap },
  methods: {
    async applyFilters(filters) {
      let query = [];
      filters.title ? query.push({ name: "title", value: filters.title }) : "";
      if (filters.latitude) {
        query.push({ name: "latitude", value: filters.latitude });
        this.latitude = filters.latitude;
      } else {
        this.latitude = null;
      }
      if (filters.longitude) {
        query.push({ name: "longitude", value: filters.longitude });
        this.longitude = filters.longitude;
      } else {
        this.longitude = null;
      }
      filters.date ? query.push({ name: "date", value: filters.date }) : "";
      filters.distance
        ? query.push({ name: "distance", value: filters.distance })
        : "";
      filters.category
        ? query.push({ name: "category", value: filters.category })
        : "";
      this.events = await this.getEvents(query, null);
    },
    updateSubscribers,
    updateSaves,
    showEventInMap(event) {
      this.showInMapEvent = event;
    },
    popupClosed() {
      this.showInMapEvent = null;
    },
  },
  async mounted() {
    this.events = await this.getEvents();
  },
};
</script>

<style scoped></style>
