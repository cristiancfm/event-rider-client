<template>
  <div class="card m-2">
    <div class="row p-3">
      <div class="col-9">
        <p>
          <router-link :to="'/event-categories/' + eventCategory.id">
            {{ eventCategory.name }}
          </router-link>
        </p>
        <p class="text-secondary">
          {{ eventCategory.upcomingEvents }} upcoming
          <span v-if="eventCategory.upcomingEvents.length === 1">event</span>
          <span v-else>events</span>
        </p>
      </div>
      <div class="col-3 text-end">
        <!-- Subscribe button -->
        <button
          class="btn btn-secondary m-1"
          @click="subscribeToEventCategory"
          v-if="isLogged && !isSubscribed"
        >
          <i class="bi bi-star"></i>
        </button>
        <button
          class="btn btn-secondary m-1"
          @click="subscribeToEventCategory"
          v-if="isLogged && isSubscribed"
        >
          <i class="bi bi-star-fill"></i>
        </button>
        <router-link
          class="btn btn-secondary m-1"
          to="/login"
          active-class="active"
          v-if="!isLogged"
        >
          <i class="bi bi-star"></i>
        </router-link>
        <!-- **** -->
      </div>
    </div>
  </div>
</template>

<script>
import { getStore } from "@/common/store";
import UserRepository from "@/repositories/UserRepository";

export default {
  name: "EventCategoryCard",
  props: {
    eventCategory: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isSubscribed: false,
    };
  },
  methods: {
    async subscribeToEventCategory() {
      this.$emit("subscribers", this.eventCategory);
    },
  },
  computed: {
    isLogged() {
      return getStore().state.user.logged;
    },
  },
  watch: {
    "eventCategory.subscribers": {
      handler: async function (newSubscribers) {
        if (this.isLogged) {
          const account = await UserRepository.findOneBase(
            getStore().state.user.id
          );
          const index = newSubscribers.findIndex(
            (subscriber) => subscriber.id === account.id
          );
          this.isSubscribed = index >= 0;
        }
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>

<style scoped></style>
