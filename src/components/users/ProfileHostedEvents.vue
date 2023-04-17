<template>
  <div class="row">
    <h2>
      Hosted Events
      <button class="btn btn-secondary">
        <i class="bi bi-plus-circle-fill"></i> Create event
      </button>
    </h2>
  </div>
  <div class="row">
    <ul class="nav nav-tabs" id="events-nav" role="tablist">
      <li class="nav-item" role="presentation">
        <button
          class="nav-link active"
          id="unreviewed-events-tab"
          data-bs-toggle="tab"
          data-bs-target="#unreviewed-events"
          type="button"
          role="tab"
          aria-controls="unreviewed events"
          aria-selected="true"
        >
          Unreviewed
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          class="nav-link"
          id="rejected-events-tab"
          data-bs-toggle="tab"
          data-bs-target="#rejected-events"
          type="button"
          role="tab"
          aria-controls="rejected events"
          aria-selected="false"
        >
          Rejected
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          class="nav-link"
          id="upcoming-events-tab"
          data-bs-toggle="tab"
          data-bs-target="#upcoming-events"
          type="button"
          role="tab"
          aria-controls="upcoming events"
          aria-selected="false"
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
        id="unreviewed-events"
        role="tabpanel"
        aria-labelledby="unreviewed-events-tab"
      >
        <EventsView :title="''" :events="user.hostedEvents" />
      </div>
      <div
        class="tab-pane fade"
        id="rejected-events"
        role="tabpanel"
        aria-labelledby="rejected-events-tab"
      >
        <EventsView :title="''" :events="user.hostedEvents" />
      </div>
      <div
        class="tab-pane fade"
        id="upcoming-events"
        role="tabpanel"
        aria-labelledby="upcoming-events-tab"
      >
        <EventsView :title="''" :events="user.hostedEvents" />
      </div>
      <div
        class="tab-pane fade"
        id="past-events"
        role="tabpanel"
        aria-labelledby="past-events-tab"
      >
        <EventsView :title="''" :events="user.hostedEvents" />
      </div>
    </div>
  </div>
</template>

<script>
import EventsView from "@/components/events/EventsList.vue";

export default {
  name: "ProfileHostedEvents",
  components: { EventsView },
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped></style>
