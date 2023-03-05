<template>
  <div class="container-fluid text-start p-4">
    <div class="row">
      <div class="col-3">
        <img :src="getImageSrc()" class="d-block w-100" alt="Profile image" />
      </div>
      <div class="col-9">
        <h1>
          {{ user.name }} {{ user.surname }}
          <button class="btn btn-secondary m-1">
            <i class="bi bi-person-plus"></i> Follow
          </button>
        </h1>
        <p class="text-secondary">
          {{ user.upcomingEvents }}
          <span v-if="user.upcomingEvents === 1">upcoming event</span>
          <span v-else>upcoming events</span>
        </p>
        <p class="text-secondary">
          {{ user.totalEvents }}
          <span v-if="user.totalEvents === 1">total event</span>
          <span v-else>total events</span>
        </p>
        <p>(followers)</p>
        <p>(following)</p>
      </div>
      <div class="col-sm-6"></div>
    </div>
    <div class="row">
      <p>(description)</p>
    </div>
    <br />
    <div class="row">
      <ul class="nav nav-tabs" id="events-nav" role="tablist">
        <li class="nav-item" role="presentation">
          <button
            class="nav-link active"
            id="upcoming-events-tab"
            data-bs-toggle="tab"
            data-bs-target="#upcoming-events"
            type="button"
            role="tab"
            aria-controls="upcoming events"
            aria-selected="true"
          >
            Upcoming
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            class="nav-link"
            id="past-events-tab"
            data-bs-toggle="tab"
            data-bs-target="#past-events"
            type="button"
            role="tab"
            aria-controls="past events"
            aria-selected="false"
          >
            Past
          </button>
        </li>
      </ul>
      <div class="tab-content" id="events-nav-content">
        <div
          class="tab-pane fade show active"
          id="upcoming-events"
          role="tabpanel"
          aria-labelledby="upcoming-events-tab"
        >
          <EventFilters />
          <div class="d-flex flex-wrap justify-content-start">
            <div v-for="event in user.upcomingHostedEvents" :key="event.id">
              <EventCard :event="event"></EventCard>
            </div>
          </div>
        </div>
        <div
          class="tab-pane fade"
          id="past-events"
          role="tabpanel"
          aria-labelledby="past-events-tab"
        >
          <EventFilters />
          <div class="d-flex flex-wrap justify-content-start">
            <div v-for="event in user.pastHostedEvents" :key="event.id">
              <EventCard :event="event"></EventCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { BACKEND_URL } from "@/constants";
import EventFilters from "@/components/events/EventFilters";
import EventCard from "@/components/events/EventCard";

export default {
  name: "UserDetail",
  components: { EventFilters, EventCard },
  props: {
    user: {
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
      events: [],
    };
  },
  methods: {
    getImageSrc() {
      if (this.user.image) {
        return `${BACKEND_URL}/users/${this.user.id}/image`;
      }
      return "/profile-placeholder.jpg";
    },
  },
  mounted() {},
};
</script>

<style scoped></style>
