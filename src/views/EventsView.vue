<template>
  <div class="text-start m-4">
    <h1>Upcoming Events</h1>
    <EventFilters />
    <br />
    <div class="" v-for="event in events" :key="event.id">
      <EventCard :event="event"></EventCard>
    </div>
  </div>
</template>

<script>
import EventFilters from "@/components/events/EventFilters";
import EventCard from "@/components/events/EventCard";
import EventRepository from "@/repositories/EventRepository";
export default {
  name: "EventView",
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
