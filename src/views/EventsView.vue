<template>
  <EventsList
    :title="'Upcoming Events'"
    :events="events"
    :event-type="EventType.UPCOMING"
  />
</template>

<script>
import EventsList from "@/components/events/EventsList.vue";
import EventRepository from "@/repositories/EventRepository";
import { EventType } from "@/common/event";

export default {
  name: "EventsView",
  data() {
    return {
      events: [],
    };
  },
  components: { EventsList },
  mounted() {
    EventRepository.findUpcoming().then((response) => {
      this.users = response;
    });
  },
  computed: {
    EventType() {
      return EventType;
    },
  },
};
</script>

<style scoped></style>
