<template>
  <div class="mt-3 mb-3">
    <form @submit.prevent="applyFilters">
      <fieldset
        class="reset-style bg-gradient bg-light"
        style="border-radius: 10px"
      >
        <legend class="reset-style ps-2 pe-2">Filters</legend>
        <div class="d-flex flex-wrap">
          <div class="col me-3" style="min-width: 150px">
            <label for="event-title" class="form-label m-0 mt-1">
              Event Title
            </label>
            <input
              type="text"
              class="form-control form-control-sm"
              v-model="filters.title"
              name="event-title"
            />
          </div>
          <div class="col me-3" style="min-width: 150px">
            <label for="event-location" class="form-label m-0 mt-1">
              Location
            </label>
            <input
              type="text"
              class="form-control form-control-sm"
              v-model="filters.location"
              name="event-location"
            />
          </div>
          <div class="col me-3" style="min-width: 150px">
            <label for="event-date" class="form-label m-0 mt-1">Date</label>
            <input
              type="date"
              class="form-control form-control-sm"
              v-model="filters.date"
              name="event-date"
            />
          </div>
          <div class="col me-3" style="min-width: 150px">
            <label for="event-distance" class="form-label m-0 mt-1">
              Distance
            </label>
            <select
              class="form-control form-control-sm"
              v-model="filters.distance"
              name="event-distance"
            ></select>
          </div>
          <div class="col me-3" style="min-width: 150px">
            <label for="event-category" class="form-label m-0 mt-1">
              Category
            </label>
            <select
              class="form-control form-control-sm"
              v-model="filters.category"
              name="event-category"
            >
              <option selected value="">All</option>
              <option
                v-for="eventCategory in eventCategories"
                :key="eventCategory.id"
                :value="eventCategory.id"
              >
                {{ eventCategory.name }}
              </option>
            </select>
          </div>
          <div class="col-auto pt-4">
            <button class="btn btn-primary mt-1" type="submit">Apply</button>
          </div>
        </div>
      </fieldset>
    </form>
  </div>
</template>

<script>
import EventCategoriesRepository from "@/repositories/EventCategoriesRepository";

export default {
  name: "EventFilters",
  data() {
    return {
      filters: {
        title: null,
        location: null,
        date: null,
        distance: null,
        category: "",
      },
      eventCategories: [],
    };
  },
  methods: {
    async applyFilters() {
      this.$emit("filters-applied", this.filters);
    },
  },
  mounted() {
    EventCategoriesRepository.findAll().then((response) => {
      this.eventCategories = response;
    });
  },
};
</script>

<style scoped>
.reset-style {
  all: revert;
}
</style>
