<template>
  <div class="text-start p-4">
    <h1>Upcoming Events</h1>
    <EventFilters />
    <div class="d-flex flex-wrap justify-content-start">
      <div v-for="event in events" :key="event.id">
        <EventCard :event="event" @subscribers="updateSubscribers"></EventCard>
      </div>
    </div>
  </div>
</template>

<script>
import EventFilters from "@/components/events/EventFilters";
import EventCard from "@/components/events/EventCard";
import EventRepository from "@/repositories/EventRepository";
import { getStore } from "@/common/store";
import UserRepository from "@/repositories/UserRepository";

export default {
  name: "EventsView",
  data() {
    return {
      events: [],
    };
  },
  components: { EventFilters, EventCard },
  methods: {
    async updateSubscribers(event) {
      try {
        const account = await UserRepository.findOne(getStore().state.user.id);
        const index = event.subscribers.findIndex(
          (subscriber) => subscriber.id === account.id
        );
        if (index >= 0) {
          //delete subscriber
          event.subscribers.splice(index, 1);
        } else {
          //add subscriber
          event.subscribers.push(account);
        }
        await EventRepository.save(event);
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
