<template>
  <div class="mt-3 mb-3">
    <form @submit.prevent="emitFilters">
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
            />
          </div>
          <div class="col me-3" style="min-width: 150px">
            <label for="event-location" class="form-label m-0 mt-1">
              Location
            </label>
            <input
              type="text"
              class="form-control form-control-sm"
              v-model="locationInput"
              list="locations-list"
              @input="autocompleteLocation"
            />
            <datalist id="locations-list" v-if="locationList.length > 0">
              <option selected value="">(all)</option>
              <option
                v-for="location in locationList"
                :key="location"
                :value="location.label"
              >
                {{ location.label }}
              </option>
            </datalist>
          </div>
          <div class="col me-3" style="min-width: 150px">
            <label for="event-date" class="form-label m-0 mt-1">Date</label>
            <input
              type="date"
              class="form-control form-control-sm"
              v-model="filters.date"
            />
          </div>
          <div class="col me-3" style="min-width: 150px">
            <label for="event-distance" class="form-label m-0 mt-1">
              Distance
            </label>
            <select
              class="form-control form-control-sm"
              v-model="filters.distance"
            ></select>
          </div>
          <div class="col me-3" style="min-width: 150px">
            <label for="event-category" class="form-label m-0 mt-1">
              Category
            </label>
            <select
              class="form-control form-control-sm"
              v-model="filters.category"
            >
              <option selected value="">(all)</option>
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
import { MapBoxProvider } from "leaflet-geosearch";
import { MAPBOX_TOKEN } from "@/constants";

export default {
  name: "EventFilters",
  data() {
    return {
      locationInput: "",
      locationList: [],
      filters: {
        title: null,
        latitude: null,
        longitude: null,
        date: null,
        distance: null,
        category: "",
      },
      eventCategories: [],
    };
  },
  methods: {
    async emitFilters() {
      this.$emit("filters-applied", this.filters);
    },
    async autocompleteLocation() {
      if (this.locationInput !== "") {
        const provider = new MapBoxProvider({
          params: {
            access_token: MAPBOX_TOKEN,
          },
        });
        const results = await provider.search({ query: this.locationInput });
        this.locationList = results;
        //take latitude and longitude from first result
        this.filters.latitude = results[0].y;
        this.filters.longitude = results[0].x;
        console.log(results);
        console.log(results[0].y + "," + results[0].x);
      } else {
        this.filters.latitude = null;
        this.filters.longitude = null;
      }
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
