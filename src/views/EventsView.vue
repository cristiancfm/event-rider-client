<template>
  <div class="text-start p-4">
    <h1>Upcoming Events</h1>
    <EventFilters @filters-applied="applyFilters" />
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
  methods: {
    async applyFilters(filters) {
      try {
        const query = [];
        filters.title
          ? query.push({ name: "title", value: filters.title })
          : "";
        filters.latitude
          ? query.push({ name: "latitude", value: filters.latitude })
          : "";
        filters.longitude
          ? query.push({ name: "longitude", value: filters.longitude })
          : "";
        filters.date ? query.push({ name: "date", value: filters.date }) : "";
        filters.distance
          ? query.push({ name: "distance", value: filters.distance })
          : "";
        filters.category
          ? query.push({ name: "category", value: filters.category })
          : "";
        await EventRepository.findAll(query, null).then((response) => {
          this.events = response;
        });
      } catch (err) {
        console.error(err);
      }
    },
  },
  mounted() {
    EventRepository.findAll().then((response) => {
      this.events = response;
    });
  },
};
</script>

<style scoped></style>
