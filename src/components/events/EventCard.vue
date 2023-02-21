<template>
  <div class="card" style="max-width: 400px">
    <div id="carouselExampleIndicators" class="carousel slide">
      <div class="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="0"
          class="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="../../assets/meisel1.jpg" class="d-block w-100" alt="..." />
        </div>
        <div class="carousel-item">
          <img src="../../assets/meisel2.jpg" class="d-block w-100" alt="..." />
        </div>
        <div class="carousel-item">
          <img
            src="../../assets/meisel3.webp"
            class="d-block w-100"
            alt="..."
          />
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
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
          {{ event.startingDate }} - {{ event.endingDate }}
        </p>
        <p class="text-secondary">(category)</p>
        <p class="text-secondary">{{ event.locationDetails }}</p>
      </div>
      <div class="col">
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
};
</script>

<style scoped></style>
