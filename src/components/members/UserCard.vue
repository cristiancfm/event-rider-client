<template>
  <div class="card m-2" style="min-width: 250px; max-width: 450px">
    <div class="row p-3">
      <div class="col-3">
        <img :src="getImageSrc()" class="d-block w-100" alt="Profile image" />
      </div>
      <div class="col">
        <p>
          <router-link :to="'/members/' + user.id">
            {{ user.name }} {{ user.surname }}
          </router-link>
        </p>
        <p class="text-secondary">
          {{ user.upcomingHostedEvents.length }}
          <span v-if="user.upcomingHostedEvents.length === 1"
            >upcoming event</span
          >
          <span v-else>upcoming events</span>
        </p>
        <p class="text-secondary">
          {{ user.hostedEvents.length }}
          <span v-if="user.hostedEvents.length === 1">total event</span>
          <span v-else>total events</span>
        </p>
      </div>
      <div class="col text-end">
        <button class="btn btn-secondary m-1">
          <i class="bi bi-person-plus"></i> Follow
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { BACKEND_URL } from "@/constants";

export default {
  name: "UserCard",
  props: {
    user: {
      type: Object,
      required: true,
    },
    showDetails: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  methods: {
    getImageSrc() {
      if (this.user.image) {
        return `${BACKEND_URL}/users/${this.user.id}/image`;
      }
      return "/profile-placeholder.jpg";
    },
  },
};
</script>

<style scoped></style>
