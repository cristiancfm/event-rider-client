<template>
  <div class="container-fluid text-start p-4">
    <div class="row">
      <div class="col-sm-6">
        <div class="row">
          <h3>{{ event.title }}</h3>
          <div class="col">
            <p class="text-secondary">
              <i class="bi bi-person-fill"></i> {{ event.host.name }}
              {{ event.host.surname }}
            </p>
            <p class="text-secondary">
              <i class="bi bi-calendar-week-fill"></i>
              {{ event.startingDate.toLocaleString() }}
              -
              {{ event.endingDate.toLocaleString() }}
            </p>
            <p class="text-secondary">
              <i class="bi bi-ticket-perforated-fill"></i>
              {{ event.category.name }}
            </p>
            <p class="text-secondary">
              <i class="bi bi-geo-alt-fill"></i>
              {{ event.locationDetails }}
            </p>
          </div>
          <div class="col">
            <button class="btn btn-secondary m-1">
              <i class="bi bi-bookmark"></i> Save
            </button>
            <p>(times saved)</p>
            <button class="btn btn-secondary m-1">
              <i class="bi bi-star"></i> Subscribe
            </button>
            <p>(num subscribers)</p>
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
import { BACKEND_URL } from "@/constants";

export default {
  name: "EventDetail",
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
