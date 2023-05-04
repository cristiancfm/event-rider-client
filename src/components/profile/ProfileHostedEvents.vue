<template>
  <div class="row">
    <h2>
      Hosted Events
      <!-- Create event button -->
      <router-link
        class="btn btn-secondary"
        to="/events/create"
        v-if="isLogged"
      >
        <i class="bi bi-plus-circle-fill"></i> Create event
      </router-link>
      <!-- **** -->
    </h2>
  </div>
  <div class="row">
    <ul class="nav nav-tabs" id="events-nav" role="tablist">
      <li class="nav-item" role="presentation">
        <button
          class="nav-link active"
          id="unreviewed-events-tab"
          data-bs-toggle="tab"
          data-bs-target="#unreviewed-events"
          type="button"
          role="tab"
          aria-controls="unreviewed events"
          aria-selected="true"
        >
          Unreviewed
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          class="nav-link"
          id="rejected-events-tab"
          data-bs-toggle="tab"
          data-bs-target="#rejected-events"
          type="button"
          role="tab"
          aria-controls="rejected events"
          aria-selected="false"
        >
          Rejected
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          class="nav-link"
          id="upcoming-events-tab"
          data-bs-toggle="tab"
          data-bs-target="#upcoming-events"
          type="button"
          role="tab"
          aria-controls="upcoming events"
          aria-selected="false"
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
        id="unreviewed-events"
        role="tabpanel"
        aria-labelledby="unreviewed-events-tab"
      >
        <EventsList :title="''" :get-events="getUnreviewedEvents" />
      </div>
      <div
        class="tab-pane fade"
        id="rejected-events"
        role="tabpanel"
        aria-labelledby="rejected-events-tab"
      >
        <EventsList :title="''" :get-events="getRejectedEvents" />
      </div>
      <div
        class="tab-pane fade"
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
</template>

<script>
import EventsList from "@/components/events/EventsList.vue";
import UserRepository from "@/repositories/UserRepository";
import { getStore } from "@/common/store";

export default {
  name: "ProfileHostedEvents",
  components: { EventsList },
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  methods: {
    async getUpcomingEvents(query) {
      return await UserRepository.findUserUpcomingEvents(
        getStore().state.user.id,
        query,
        null
      );
    },
    async getPastEvents(query) {
      return await UserRepository.findUserPastEvents(
        getStore().state.user.id,
        query,
        null
      );
    },
    async getUnreviewedEvents(query) {
      return await UserRepository.findUserUnreviewedEvents(
        getStore().state.user.id,
        query,
        null
      );
    },
    async getRejectedEvents(query) {
      return await UserRepository.findUserRejectedEvents(
        getStore().state.user.id,
        query,
        null
      );
    },
    handleTabChange() {
      // Leaflet will not render correctly when the user changes between tabs
      // because the containers are hidden and shown and Leaflet is not aware
      // of that. Resizing the browser window will fix the issue, since Leaflet
      // listens to the browser resizing event.
      window.dispatchEvent(new Event("resize"));
    },
  },
  computed: {
    isLogged() {
      return getStore().state.user.logged;
    },
  },
  mounted() {
    const eventsNav = document.querySelector("#events-nav");
    eventsNav.addEventListener("shown.bs.tab", this.handleTabChange);
  },
};
</script>

<style scoped></style>
