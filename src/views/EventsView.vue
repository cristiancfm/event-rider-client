<template>
  <EventsList
    :title="'Upcoming Events'"
    :get-events-function="getEventsFunction"
  />
</template>

<script>
import EventsList from "@/components/events/EventsList.vue";
import { findEvents } from "@/common/event";

export default {
  name: "EventsView",
  components: { EventsList },
  methods: {
    getEventsFunction(filters) {
      return findEvents("upcoming", filters);
    },
  },
};
</script>

<style scoped></style>
