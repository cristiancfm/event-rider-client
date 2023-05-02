<template>
  <div class="container-fluid text-start p-4">
    <div class="row">
      <div class="col-3" style="max-width: 200px">
        <img
          :src="getImageSrc()"
          class="d-block w-100"
          alt="Profile image"
          @error="setPlaceholder"
        />
      </div>
      <div class="col-9">
        <h3>
          {{ user.name }} {{ user.surname }}
          <!-- Edit profile button -->
          <button
            class="btn btn-secondary m-1"
            @click="editProfile"
            v-if="isLogged"
          >
            <i class="bi bi-pencil-fill"></i> Edit profile
          </button>
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
          <span v-if="user.hostedEvents.lenght === 1">hosted event</span>
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
      <nav class="navbar navbar-expand-md p-0">
        <div class="container-fluid">
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarProfile"
            aria-controls="navbarProfile"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarProfile">
            <ul class="navbar-nav me-auto">
              <li class="nav-item">
                <router-link
                  class="btn btn-secondary me-2 mb-2"
                  to="/profile/hosted-events"
                  aria-current="page"
                  active-class="active"
                >
                  Hosted Events
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  class="btn btn-secondary me-2 mb-2"
                  to="/profile/saved-events"
                  active-class="active"
                >
                  Saved Events
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  class="btn btn-secondary me-2 mb-2"
                  to="/profile/subscribed-events"
                  active-class="active"
                >
                  Subscribed Events
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  class="btn btn-secondary me-2 mb-2"
                  to="/profile/subscribed-categories"
                  active-class="active"
                >
                  Subscribed Categories
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
    <br />
    <router-view :user="this.user" />
  </div>
</template>

<script>
import { BACKEND_URL } from "@/constants";
import { getStore } from "@/common/store";

export default {
  name: "ProfileDetail",
  props: {
    user: {
      type: Object,
      required: true,
    },
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
  },
  computed: {
    isLogged() {
      return getStore().state.user.logged;
    },
  },
};
</script>

<style scoped></style>
