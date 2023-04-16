<template>
  <div class="text-start p-2">
    <h2 class="m-2">{{ title }}</h2>
    <EventFilters
      ref="eventFilters"
      @filters-applied="applyFilters"
      :category-id="categoryId"
    />
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
import EventFilters from "@/components/events/EventFilters";
import EventCard from "@/components/events/EventCard";
import EventRepository from "@/repositories/EventRepository";
import { applyFilters, updateSubscribers, updateSaves } from "@/common/event";
import EventMap from "@/components/events/EventMap";

export default {
  name: "EventsView",
  props: {
    titleProp: {
      type: String,
      required: false,
    },
    eventsProp: {
      type: Object,
      required: false,
    },
  },
  computed: {
    categoryId() {
      return parseInt(this.$route.params.id);
    },
  },
  data() {
    return {
      title: "",
      events: [],
      showInMapEvent: null,
    };
  },
  components: { EventFilters, EventCard, EventMap },
  methods: {
    applyFilters,
    updateSubscribers,
    updateSaves,
    showEventInMap(event) {
      this.showInMapEvent = event;
    },
    popupClosed() {
      this.showInMapEvent = null;
    },
  },
  mounted() {
    if (this.titleProp === undefined) {
      this.title = "Upcoming Events";
    } else {
      this.title = this.titleProp;
    }
    if (this.eventsProp === undefined) {
      EventRepository.findAll().then((response) => {
        this.events = response;
      });
    } else {
      this.events = this.eventsProp;
    }
    if (this.categoryId !== undefined) {
      // wait until the component is fully rendered
      setTimeout(() => {
        this.$refs.eventFilters.emitFilters();
      }, 100);
    }
  },
};
</script>

<style scoped></style>
