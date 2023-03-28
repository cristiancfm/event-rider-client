<template>
  <div class="card m-2" style="max-width: 400px">
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
            />
          </div>
          <div v-if="item - 1 !== 0" class="carousel-item">
            <img
              :src="getImageSrc(item - 1)"
              class="d-block w-100"
              alt="Event image"
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
    <div class="row p-3">
      <div class="col">
        <h3>
          <router-link :to="'/events/' + event.id">
            {{ event.title }}
          </router-link>
        </h3>
        <p>{{ event.host.name }} {{ event.host.surname }}</p>
        <p class="text-secondary">
          {{ event.startingDate.toLocaleString() }}
          -
          {{ event.endingDate.toLocaleString() }}
        </p>
        <p class="text-secondary">{{ event.category.name }}</p>
        <p class="text-secondary">{{ event.locationDetails }}</p>
      </div>
      <div class="col text-end">
        <button class="btn btn-secondary m-1">
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
  </div>
</template>

<script>
import { BACKEND_URL } from "@/constants";
import { getStore } from "@/common/store";
import UserRepository from "@/repositories/UserRepository";

export default {
  name: "EventCard",
  props: {
    event: {
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
    async subscribeToEvent() {
      this.$emit("subscribers", this.event);
    },
    async saveEvent() {
      this.$emit("saves", this.event);
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
        const account = await UserRepository.findOne(getStore().state.user.id);
        const index = newSubscribers.findIndex(
          (subscriber) => subscriber.id === account.id
        );
        this.isSubscribed = index >= 0;
      },
      immediate: true,
      deep: true,
    },
    "event.saves": {
      handler: async function (newSaves) {
        const account = await UserRepository.findOne(getStore().state.user.id);
        const index = newSaves.findIndex((save) => save.id === account.id);
        this.isSaved = index >= 0;
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>

<style scoped></style>
