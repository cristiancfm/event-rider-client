<template>
  <div class="m-auto" style="max-width: 720px">
    <div class="text-start p-2">
      <h2 class="m-2">Edit Event</h2>
      <form @submit.prevent="updateEvent()">
        <div class="row p-2">
          <div class="col-6">
            <div class="mb-2">
              <label for="title" class="form-label">Title</label>
              <input
                type="text"
                class="form-control"
                id="title"
                v-model="eventForm.title"
                required
              />
            </div>
            <div class="mb-2">
              <label for="startingDate" class="form-label">
                <i class="bi bi-calendar-week-fill"></i>
                Starting Date & Time
              </label>
              <input
                type="datetime-local"
                class="form-control"
                id="startingDate"
                v-model="eventForm.startingDate"
                required
              />
            </div>
            <div class="mb-2">
              <label for="endingDate" class="form-label">
                <i class="bi bi-calendar-week-fill"></i>
                Ending Date & Time
              </label>
              <input
                type="datetime-local"
                class="form-control"
                id="endingDate"
                v-model="eventForm.endingDate"
                required
              />
            </div>
            <div class="mb-2">
              <label for="category" class="form-label">
                <i class="bi bi-ticket-perforated-fill"></i>
                Category
              </label>
              <div class="row">
                <div class="col-6">
                  <div class="form-check">
                    <input
                      type="radio"
                      class="form-check-input me-1"
                      id="existingCategory"
                      name="categoryType"
                      v-model="eventForm.existingCategoryChecked"
                      :value="true"
                    />
                    <label for="existingCategory" class="form-check-label">
                      Existing category
                    </label>
                  </div>
                  <select
                    class="form-control"
                    id="category"
                    v-model="eventForm.existingCategoryId"
                    :disabled="!eventForm.existingCategoryChecked"
                    required
                  >
                    <option
                      v-for="eventCategory in eventCategories"
                      :key="eventCategory.id"
                      :value="eventCategory.id"
                    >
                      {{ eventCategory.name }}
                    </option>
                  </select>
                </div>
                <div class="col-6">
                  <div class="form-check">
                    <input
                      type="radio"
                      class="form-check-input me-1"
                      id="newCategory"
                      name="categoryType"
                      v-model="eventForm.existingCategoryChecked"
                      :value="false"
                    />
                    <label for="newCategory" class="form-check-label">
                      New category
                    </label>
                  </div>
                  <input
                    type="text"
                    class="form-control"
                    id="categoryNew"
                    v-model="eventForm.newCategory"
                    :disabled="eventForm.existingCategoryChecked"
                    required
                  />
                </div>
              </div>
              <!-- Info card -->
              <div class="row p-1 m-1 mt-2 bg-info" style="border-radius: 5px">
                <p class="mt-1">
                  <i class="bi bi-info-circle-fill"></i> New categories will be
                  reviewed by administrators before they become available
                </p>
              </div>
              <!-- **** -->
            </div>
            <div class="mb-2">
              <label for="location" class="form-label">
                <i class="bi bi-geo-alt-fill"></i>
                Location
              </label>
              <div class="input-group">
                <span class="input-group-text">
                  <i class="bi bi-search"></i>
                </span>
                <input
                  type="search"
                  class="form-control"
                  id="location"
                  v-model="locationInput"
                  list="locations-list"
                  @input="autocompleteLocation"
                  required
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
            </div>
            <div class="mb-2">
              <label for="locationDetails" class="form-label">
                Location Details (floor, etc.) (optional)
              </label>
              <input
                type="text"
                class="form-control"
                id="locationDetails"
                v-model="eventForm.locationDetails"
              />
            </div>
            <div class="mb-2">
              <label for="description" class="form-label"> Description </label>
              <textarea
                class="form-control"
                id="description"
                v-model="eventForm.description"
                required
              />
            </div>
            <button
              type="submit"
              class="btn btn-primary mt-2"
              @click="eventForm.error = null"
            >
              Update Event
            </button>
            <button class="btn btn-secondary mt-2 ms-2" @click="$router.go(-1)">
              Cancel
            </button>
            <!-- Info card -->
            <div class="row p-1 m-1 mt-3 bg-info" style="border-radius: 5px">
              <p class="mt-1">
                <i class="bi bi-info-circle-fill"></i> Since you are an
                unverified user, this event will be reviewed by administrators
                before it becomes available
              </p>
            </div>
            <!-- **** -->
          </div>
          <div class="col-6">
            <image-selector
              ref="imageSelector"
              :maxFiles="10"
              :maxFileSize="5 * 1024 * 1024"
              :serverImages="serverImages"
            />
            <div
              class="mt-2"
              v-if="
                eventForm.title === '' ||
                eventForm.coordinateX === '' ||
                eventForm.coordinateY === ''
              "
            >
              <div style="aspect-ratio: 2/3">
                <img
                  src="/map-placeholder.png"
                  class="d-block w-100"
                  style="object-fit: cover; width: 100%; height: 100%"
                  alt="Map placeholder"
                />
              </div>
            </div>
            <div v-else>
              <EventMap
                :events="[eventForm]"
                @popup-closed="popupClosed"
              ></EventMap>
            </div>
            <div
              class="alert alert-danger alert-dismissible fade show mt-3"
              role="alert"
              v-if="eventForm.error"
            >
              <strong>Error:</strong> {{ eventForm.error }}
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
                @click="eventForm.error = null"
              ></button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { BACKEND_URL, MAPBOX_TOKEN } from "@/constants";
import { getStore } from "@/common/store";
import { MapBoxProvider } from "leaflet-geosearch";
import EventMap from "@/components/events/EventMap.vue";
import EventCategoriesRepository from "@/repositories/EventCategoryRepository";
import EventRepository from "@/repositories/EventRepository";
import ImageSelector from "@/components/ImageSelector";
import { dateToISOLikeButLocal } from "@/common/event";

export default {
  name: "EventEdit",
  props: {
    event: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      locationInput: "",
      locationList: [],
      eventCategories: [],
      serverImages: [],
      eventForm: {
        id: null,
        title: "",
        startingDate: "",
        endingDate: "",
        existingCategoryChecked: true,
        existingCategoryId: null,
        newCategory: null,
        coordinateX: "",
        coordinateY: "",
        locationDetails: "",
        description: "",
        error: null,
      },
    };
  },
  components: { ImageSelector, EventMap },
  methods: {
    async autocompleteLocation() {
      if (this.locationInput !== "") {
        const provider = new MapBoxProvider({
          params: {
            access_token: MAPBOX_TOKEN,
            proximity: "ip", //the places closer to the user IP are shown first
          },
        });
        const results = await provider.search({ query: this.locationInput });
        this.locationList = results;
        //take latitude and longitude from first result
        // - coordinateX is the latitude
        // - coordinateY is the longitude
        this.eventForm.coordinateX = results[0].y;
        this.eventForm.coordinateY = results[0].x;
      } else {
        this.eventForm.coordinateX = "";
        this.eventForm.coordinateY = "";
      }
    },
    showEventInMap(event) {
      this.showInMapEvent = event;
    },
    popupClosed() {
      this.showInMapEvent = null;
    },
    async updateEvent() {
      try {
        await EventRepository.save(this.eventForm);
        if (this.$refs.imageSelector.imagesToDelete.length > 0) {
          for (const file of this.$refs.imageSelector.imagesToDelete) {
            const segments = file.url.split("/");
            const idImage = segments.pop();
            await EventRepository.deleteEventImage(this.eventForm.id, idImage);
          }
        }
        if (this.$refs.imageSelector.imagesToUpload.length > 0) {
          for (const image of this.$refs.imageSelector.imagesToUpload) {
            await EventRepository.saveEventImage(this.eventForm.id, image.file);
          }
        }
        this.$router.push("/profile/hosted-events");
      } catch (err) {
        const response = JSON.parse(err.request.response);
        this.eventForm.error = response.message;
        console.error(err);
      }
    },
    async coordinatesToAddress() {
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
      return results[0].label;
    },
  },
  computed: {
    isLogged() {
      return getStore().state.user.logged;
    },
  },
  async mounted() {
    EventCategoriesRepository.findAll().then((response) => {
      this.eventCategories = response;
    });
    this.eventForm.id = this.event.id;
    this.eventForm.title = this.event.title;
    this.eventForm.startingDate = dateToISOLikeButLocal(
      this.event.startingDate
    );
    this.eventForm.endingDate = dateToISOLikeButLocal(this.event.endingDate);
    this.eventForm.existingCategoryId = this.event.category.id;
    this.eventForm.coordinateX = this.event.coordinateX;
    this.eventForm.coordinateY = this.event.coordinateY;
    this.eventForm.locationDetails = this.event.locationDetails;
    this.eventForm.description = this.event.description;
    this.locationInput = await this.coordinatesToAddress();
    // add images from server:
    if (this.event.numImages > 0) {
      for (let i = 0; i < this.event.numImages; i++) {
        const image = {
          url: `${BACKEND_URL}/events/${this.event.id}/image/${i}`,
          name: "",
        };
        this.$refs.imageSelector.imagesList.push(image);
      }
    }
  },
};
</script>

<style scoped></style>
