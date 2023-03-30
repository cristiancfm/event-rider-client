<template>
  <div class="text-start p-2">
    <h2 class="m-2">{{ title }}</h2>
    <EventFilters @filters-applied="applyFilters" />
    <div class="d-flex flex-wrap justify-content-start">
      <div v-for="event in events" :key="event.id">
        <EventCard
          :event="event"
          @subscribers="updateSubscribers"
          @saves="updateSaves"
        ></EventCard>
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
  data() {
    return {
      title: "",
      events: [],
    };
  },
  components: { EventFilters, EventCard },
  methods: {
    applyFilters,
    updateSubscribers,
    updateSaves,
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
  },
};
</script>

<style scoped></style>
