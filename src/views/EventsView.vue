<template>
  <div class="text-start p-4">
    <h1>Upcoming Events</h1>
    <EventFilters />
    <div class="d-flex flex-wrap justify-content-start">
      <div v-for="event in events" :key="event.id">
        <EventCard :event="event"></EventCard>
      </div>
    </div>
  </div>
</template>

<script>
import EventFilters from "@/components/events/EventFilters";
import EventCard from "@/components/events/EventCard";
import EventRepository from "@/repositories/EventRepository";
export default {
  name: "EventsView",
  data() {
    return {
      events: [],
    };
  },
  components: { EventFilters, EventCard },
  mounted() {
    EventRepository.findAll().then((response) => {
      this.events = response;
    });
  },
};
</script>

<style scoped></style>
