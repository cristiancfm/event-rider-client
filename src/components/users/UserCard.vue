<template>
  <div class="card m-2" style="min-width: 250px; max-width: 450px">
    <div class="row p-3">
      <div class="col-3">
        <div style="aspect-ratio: 1/1">
          <img
            :src="getImageSrc()"
            class="d-block w-100"
            style="object-fit: cover; width: 100%; height: 100%"
            alt="Profile image"
            @error="setPlaceholder"
          />
        </div>
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
          {{ user.upcomingHostedEvents.length + user.pastHostedEvents.length }}
          <span v-if="user.hostedEvents.length === 1">total event</span>
          <span v-else>total events</span>
        </p>
      </div>
      <div class="col text-end">
        <!-- Follow button -->
        <button
          class="btn btn-secondary m-1"
          @click="followUser"
          v-if="isLogged && !isFollowed"
        >
          <i class="bi bi-person-plus"></i> Follow
        </button>
        <button
          class="btn btn-secondary m-1"
          @click="followUser"
          v-if="isLogged && isFollowed"
        >
          <i class="bi bi-person-plus-fill"></i> Followed
        </button>
        <router-link
          class="btn btn-secondary m-1"
          to="/login"
          active-class="active"
          v-if="!isLogged"
        >
          <i class="bi bi-person-plus"></i> Follow
        </router-link>
        <!-- **** -->
      </div>
    </div>
  </div>
</template>

<script>
import { BACKEND_URL } from "@/constants";
import { getStore } from "@/common/store";
import UserRepository from "@/repositories/UserRepository";

export default {
  name: "UserCard",
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isFollowed: false,
    };
  },
  methods: {
    getImageSrc() {
      if (this.user.image) {
        return `${BACKEND_URL}/users/${this.user.id}/image`;
      }
      return "/profile-placeholder.jpg";
    },
    setPlaceholder(event) {
      event.target.src = "/placeholder-square.png";
    },
    async followUser() {
      this.$emit("followers", this.user);
    },
  },
  computed: {
    isLogged() {
      return getStore().state.user.logged;
    },
  },
  watch: {
    "user.followers": {
      handler: async function (newFollowers) {
        if (this.isLogged) {
          const account = await UserRepository.findOneBase(
            getStore().state.user.id
          );
          const index = newFollowers.findIndex(
            (follower) => follower.id === account.id
          );
          this.isFollowed = index >= 0;
        }
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>

<style scoped></style>
