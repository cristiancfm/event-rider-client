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
          {{ user.upcomingEvents }}
          <span v-if="user.upcomingEvents === 1">upcoming event</span>
          <span v-else>upcoming events</span>
        </p>
        <p class="text-secondary">
          {{ user.totalEvents }}
          <span v-if="user.totalEvents === 1">total event</span>
          <span v-else>total events</span>
        </p>
        <p>(followers)</p>
        <p>(following)</p>
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
          <EventsView
            :title-prop="''"
            :events-prop="user.upcomingHostedEvents"
          />
        </div>
        <div
          class="tab-pane fade"
          id="past-events"
          role="tabpanel"
          aria-labelledby="past-events-tab"
        >
          <EventsView :title-prop="''" :eventsProp="user.pastHostedEvents" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { BACKEND_URL } from "@/constants";
import EventsView from "@/views/EventsView";
import { getStore } from "@/common/store";
import UserRepository from "@/repositories/UserRepository";

export default {
  name: "UserDetail",
  components: { EventsView },
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
  data() {
    return {
      events: [],
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
