<template>
  <div class="card m-2">
    <div
      :id="'event-' + event.id + '-carousel'"
      class="carousel slide"
      data-bs-ride="carousel"
    >
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
          :data-bs-target="'#event-' + event.id + '-carousel'"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          :data-bs-target="'#event-' + event.id + '-carousel'"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>
    <div class="row p-3 pb-0">
      <div class="col-12">
        <h3>
          <router-link :to="'/events/' + event.id">
            <span v-if="event.status === 'CANCELLED'"
              ><s>{{ event.title }}</s></span
            >
            <span v-else>{{ event.title }}</span>
          </router-link>
        </h3>
      </div>
    </div>
    <div class="row p-3 pt-0 pb-0">
      <div class="col">
        <p>{{ event.host.name }} {{ event.host.surname }}</p>
        <p class="text-secondary">
          {{ event.startingDate.toLocaleString() }}
          -
          {{ event.endingDate.toLocaleString() }}
        </p>
        <p class="text-secondary">{{ event.category.name }}</p>
        <p class="text-secondary">{{ eventAddress }}</p>
      </div>
      <div class="col text-end">
        <button class="btn btn-secondary m-1" @click="showInMap">
          <i class="bi bi-map-fill"></i> Show in map
        </button>
        <br />
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
        <br />
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
      </div>
    </div>
    <!-- Rejected info card -->
    <div
      class="row p-1 m-3 bg-warning"
      style="border-radius: 5px"
      v-if="event.status === 'REJECTED'"
    >
      <p class="mt-1">
        <i class="bi bi-slash-circle-fill"></i> <b>Rejected</b>
      </p>
      <p v-if="event.adminComments !== null">
        Admin comments: {{ event.adminComments }}
      </p>
    </div>
    <!-- **** -->
    <!-- Cancelled info card -->
    <div
      class="row p-1 m-3 bg-danger"
      style="border-radius: 5px"
      v-if="event.status === 'CANCELLED'"
    >
      <p class="mt-1"><i class="bi bi-calendar-x-fill"></i> <b>Cancelled</b></p>
      <p v-if="event.cancellationReason !== null">
        Cancellation reason: {{ event.cancellationReason }}
      </p>
    </div>
    <!-- **** -->
  </div>
</template>

<script>
import { BACKEND_URL, MAPBOX_TOKEN } from "@/constants";
import { getStore } from "@/common/store";
import UserRepository from "@/repositories/UserRepository";
import { MapBoxProvider } from "leaflet-geosearch";

export default {
  name: "EventCard",
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
      return "/placeholder.png";
    },
    setPlaceholder(event) {
      event.target.src = "/placeholder.png";
    },
    async subscribeToEvent() {
      this.$emit("subscribers", this.event);
    },
    async saveEvent() {
      this.$emit("saves", this.event);
    },
    showInMap() {
      this.$emit("show-in-map", this.event);
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
      this.eventAddress = results[0].raw.text;
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
