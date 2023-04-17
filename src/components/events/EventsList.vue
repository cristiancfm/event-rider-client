<template>
  <div class="text-start p-2">
    <h2 class="m-2">{{ title }}</h2>
    <EventFilters ref="eventFilters" @filters-applied="handleFiltersApplied" />
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
          :latitude="43.37135"
          :longitude="-8.396"
          :zoom="13"
          :show-in-map-event="showInMapEvent"
          @popup-closed="popupClosed"
        ></EventMap>
      </div>
    </div>
    <div v-if="events.length === 0" class="text-center mt-2">
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
    getEventsFunction: {
      // the function to retrieve the events
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      events: [],
      showInMapEvent: null,
    };
  },
  components: { EventFilters, EventCard, EventMap },
  methods: {
    async handleFiltersApplied(filters) {
      this.events = await this.getEventsFunction(filters);
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
    this.events = await this.getEventsFunction();
  },
};
</script>

<style scoped></style>
