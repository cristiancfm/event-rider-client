<template>
  <div class="text-start m-4">
    <h1>Upcoming Events</h1>
    <EventFilters />
    <EventCard />
  </div>
</template>

<script>
import EventFilters from "@/components/events/EventFilters";
import EventCard from "@/components/events/EventCard";
export default {
  name: "EventView",
  components: { EventFilters, EventCard },
};
</script>

<style scoped></style>
