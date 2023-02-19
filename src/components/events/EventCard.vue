<template>
  <div style="max-width: 500px">
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
    <div class="row mt-3">
      <div class="col">
        <p>Meisel 93</p>
        <p>Fundación MOP</p>
        <p class="text-secondary">oct 2022 - may 2023</p>
        <p class="text-secondary">Exhibition</p>
        <p class="text-secondary">Porto de A Coruña</p>
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
};
</script>

<style scoped></style>
