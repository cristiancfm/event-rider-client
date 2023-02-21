<template>
  <EventCard v-if="event" :event="event" :showDetails="false"></EventCard>
</template>

<script>
import EventCard from "@/components/events/EventCard";
import EventRepository from "@/repositories/EventRepository";

export default {
  name: "EventDetail",
  data() {
    return {
      event: null,
    };
  },
  components: {
    EventCard,
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        this.event = await EventRepository.findOne(this.$route.params.id);
      } catch (err) {
        console.error(err);
      }
    },
  },
};
</script>

<style scoped></style>
