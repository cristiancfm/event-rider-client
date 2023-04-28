<template>
  <div class="container-fluid text-start p-4">
    <div class="row">
      <div class="col-3" style="max-width: 200px">
        <img :src="getImageSrc()" class="d-block w-100" alt="Profile image" />
      </div>
      <div class="col-9">
        <h3>
          {{ user.name }} {{ user.surname }}
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
        </h3>
        <p class="text-secondary">
          {{ user.upcomingHostedEvents.length }}
          <span v-if="user.upcomingHostedEvents.length === 1"
            >upcoming event</span
          >
          <span v-else>upcoming events</span>
        </p>
        <p class="text-secondary">
          {{ user.hostedEvents.length }}
          <span v-if="user.hostedEvents.length === 1">hosted event</span>
          <span v-else>hosted events</span>
        </p>
        <p>
          {{ user.followers.length }}
          <span v-if="user.followers.length === 1">follower</span>
          <span v-else>followers</span>
        </p>
        <p>{{ user.following.length }} following</p>
      </div>
      <div class="col-sm-6"></div>
    </div>
    <div class="row mt-3">
      <p>{{ user.biography }}</p>
    </div>
    <br />
    <div class="row">
      <ul class="nav nav-tabs" id="events-nav" role="tablist">
        <li class="nav-item" role="presentation">
          <button
            class="nav-link active"
            id="upcoming-events-tab"
            data-bs-toggle="tab"
            data-bs-target="#upcoming-events"
            type="button"
            role="tab"
            aria-controls="upcoming events"
            aria-selected="true"
          >
            Upcoming
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            class="nav-link"
            id="past-events-tab"
            data-bs-toggle="tab"
            data-bs-target="#past-events"
            type="button"
            role="tab"
            aria-controls="past events"
            aria-selected="false"
          >
            Past
          </button>
        </li>
      </ul>
      <div class="tab-content" id="events-nav-content">
        <div
          class="tab-pane fade show active"
          id="upcoming-events"
          role="tabpanel"
          aria-labelledby="upcoming-events-tab"
        >
          <EventsList :title="''" :get-events="getUpcomingEvents" />
        </div>
        <div
          class="tab-pane fade"
          id="past-events"
          role="tabpanel"
          aria-labelledby="past-events-tab"
        >
          <EventsList :title="''" :get-events="getPastEvents" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { BACKEND_URL } from "@/constants";
import { getStore } from "@/common/store";
import UserRepository from "@/repositories/UserRepository";
import EventsList from "@/components/events/EventsList";

export default {
  name: "UserDetail",
  components: { EventsList },
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
    async followUser() {
      this.$emit("followers", this.user);
    },
    async getUpcomingEvents(query) {
      return await UserRepository.findUserUpcomingEvents(
        this.user.id,
        query,
        null
      );
    },
    async getPastEvents(query) {
      return await UserRepository.findUserPastEvents(this.user.id, query, null);
    },
    handleTabChange() {
      // Leaflet will not render correctly when the user changes between tabs
      // because the containers are hidden and shown and Leaflet is not aware
      // of that. Resizing the browser window will fix the issue, since Leaflet
      // listens to the browser resizing event.
      window.dispatchEvent(new Event("resize"));
    },
  },
  mounted() {
    const eventsNav = document.querySelector("#events-nav");
    eventsNav.addEventListener("shown.bs.tab", this.handleTabChange);
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
