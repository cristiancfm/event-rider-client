<template>
  <EventDetail
    v-if="event"
    :event="event"
    :showDetails="false"
    @subscribers="updateSubscribers"
  ></EventDetail>
</template>

<script>
import EventRepository from "@/repositories/EventRepository";
import EventDetail from "@/components/events/EventDetail";
import UserRepository from "@/repositories/UserRepository";
import { getStore } from "@/common/store";

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
};
</script>

<style scoped></style>
