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
        <button class="btn btn-secondary m-1">
          <i class="bi bi-bookmark"></i> Save
        </button>
        <br />
        <button class="btn btn-secondary m-1">
          <i class="bi bi-star"></i> Subscribe
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { BACKEND_URL } from "@/constants";

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
  methods: {
    getImageSrc(item) {
      if (this.event.numImages > 0) {
        return `${BACKEND_URL}/events/${this.event.id}/image/${item}`;
      }
      return "/placeholder.png";
    },
  },
};
</script>

<style scoped></style>
