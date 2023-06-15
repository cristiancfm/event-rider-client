<template>
  <div class="container-fluid text-start p-4">
    <div class="row">
      <div class="col-sm-6">
        <div class="row">
          <h3 style="text-transform: none">{{ event.title }}</h3>
          <div class="col">
            <p class="text-secondary">
              <i class="bi bi-person-fill"></i> {{ event.host.name }}
              {{ event.host.surname }}
            </p>
            <p class="text-secondary">
              <i class="bi bi-calendar-week-fill"></i>
              {{ new Date(event.startingDate).toLocaleString() }}
              -
              {{ new Date(event.endingDate).toLocaleString() }}
            </p>
            <p class="text-secondary">
              <i class="bi bi-ticket-perforated-fill"></i>
              {{ event.category.name }}
            </p>
            <p class="text-secondary">
              <i class="bi bi-geo-alt-fill"></i>
              {{ eventAddress }}
            </p>
            <p class="text-secondary" v-if="event.locationDetails">
              {{ event.locationDetails }}
            </p>
          </div>
          <div class="col">
            <!-- Save button -->
            <button
              class="btn btn-secondary m-1"
              @click="saveEvent"
              v-if="isLogged && !isSaved"
            >
              <i class="bi bi-bookmark"></i> Save
            </button>
            <button
              class="btn btn-secondary m-1"
              @click="saveEvent"
              v-if="isLogged && isSaved"
            >
              <i class="bi bi-bookmark-fill"></i> Saved
            </button>
            <router-link
              class="btn btn-secondary m-1"
              to="/login"
              active-class="active"
              v-if="!isLogged"
            >
              <i class="bi bi-bookmark"></i> Save
            </router-link>
            <!-- **** -->
            <p>
              {{ event.saves.length }}
              <span v-if="event.saves.length === 1">save</span>
              <span v-else>saves</span>
            </p>
            <!-- Subscribe button -->
            <button
              class="btn btn-secondary m-1"
              @click="subscribeToEvent"
              v-if="isLogged && !isSubscribed"
            >
              <i class="bi bi-star"></i> Subscribe
            </button>
            <button
              class="btn btn-secondary m-1"
              @click="subscribeToEvent"
              v-if="isLogged && isSubscribed"
            >
              <i class="bi bi-star-fill"></i> Subscribed
            </button>
            <router-link
              class="btn btn-secondary m-1"
              to="/login"
              active-class="active"
              v-if="!isLogged"
            >
              <i class="bi bi-star"></i> Subscribe
            </router-link>
            <!-- **** -->
            <p>
              {{ event.subscribers.length }}
              <span v-if="event.subscribers.length === 1">subscriber</span>
              <span v-else>subscribers</span>
            </p>
          </div>
        </div>
      </div>
      <div class="col-sm-6">
        <div id="event-carousel-indicators" class="carousel slide">
          <div class="carousel-inner">
            <template v-for="item in event.numImages" :key="item">
              <div v-if="item - 1 === 0" class="carousel-item active">
                <img
                  :src="getImageSrc(item - 1)"
                  class="d-block w-100"
                  alt="Event image"
                  @error="setPlaceholder"
                />
              </div>
              <div v-if="item - 1 !== 0" class="carousel-item">
                <img
                  :src="getImageSrc(item - 1)"
                  class="d-block w-100"
                  alt="Event image"
                  @error="setPlaceholder"
                />
              </div>
            </template>
          </div>
          <div v-if="event.numImages > 1">
            <button
              class="carousel-control-prev"
              type="button"
              data-bs-target="#event-carousel-indicators"
              data-bs-slide="prev"
            >
              <span
                class="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button
              class="carousel-control-next"
              type="button"
              data-bs-target="#event-carousel-indicators"
              data-bs-slide="next"
            >
              <span
                class="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-sm">
        <h4>Description</h4>
        <p>{{ event.description }}</p>
      </div>
      <div class="col-sm">
        <p>(mapa)</p>
      </div>
    </div>
  </div>
</template>

<script>
import { BACKEND_URL, MAPBOX_TOKEN } from "@/constants";
import { getStore } from "@/common/store";
import UserRepository from "@/repositories/UserRepository";
import { MapBoxProvider } from "leaflet-geosearch";

export default {
  name: "EventDetails",
  props: {
    event: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      eventAddress: "",
      isSubscribed: false,
      isSaved: false,
    };
  },
  methods: {
    getImageSrc(item) {
      if (this.event.numImages > 0) {
        return `${BACKEND_URL}/events/${this.event.id}/image/${item}`;
      }
      return "/event-placeholder.png";
    },
    setPlaceholder(event) {
      event.target.src = "/error-placeholder.png";
    },
    async subscribeToEvent() {
      this.$emit("subscribers", this.event);
    },
    async saveEvent() {
      this.$emit("saves", this.event);
    },
    async coordinatesToLocation() {
      const provider = new MapBoxProvider({
        params: {
          access_token: MAPBOX_TOKEN,
        },
      });
      const results = await provider.search({
        query: this.event.coordinateY + "," + this.event.coordinateX,
        //the mapbox url uses {longitude, latitude} in that order
      });
      //take address from first result
      this.eventAddress = results[0].label;
    },
  },
  computed: {
    isLogged() {
      return getStore().state.user.logged;
    },
  },
  watch: {
    "event.subscribers": {
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
    "event.saves": {
      handler: async function (newSaves) {
        if (this.isLogged) {
          const account = await UserRepository.findOneBase(
            getStore().state.user.id
          );
          const index = newSaves.findIndex((save) => save.id === account.id);
          this.isSaved = index >= 0;
        }
      },
      immediate: true,
      deep: true,
    },
  },
  mounted() {
    this.coordinatesToLocation();
  },
};
</script>

<style scoped></style>
