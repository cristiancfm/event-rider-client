<template>
  <EventDetail
    v-if="event"
    :event="event"
    :showDetails="false"
    @subscribers="updateSubscribers"
    @saves="updateSaves"
  ></EventDetail>
</template>

<script>
import EventRepository from "@/repositories/EventRepository";
import EventDetail from "@/components/events/EventDetail";
import { updateSubscribers, updateSaves } from "@/common/event";

export default {
  name: "EventDetailView",
  data() {
    return {
      event: null,
    };
  },
  components: {
    EventDetail,
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
    updateSubscribers,
    updateSaves,
  },
};
</script>

<style scoped></style>
