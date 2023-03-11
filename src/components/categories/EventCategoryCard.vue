<template>
  <div class="card m-2" style="min-width: 250px; max-width: 450px">
    <div class="row p-3">
      <div class="col">
        <p>
          <router-link :to="'/event-categories/' + eventCategory.id">
            {{ eventCategory.name }}
          </router-link>
        </p>
        <p class="text-secondary">
          {{ eventCategory.upcomingEvents }}
          <span v-if="eventCategory.upcomingEvents.length === 1">event</span>
          <span v-else>events</span>
        </p>
      </div>
      <div class="col text-end">
        <button class="btn btn-secondary m-1">
          <i class="bi bi-star"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EventCategoryCard",
  props: {
    eventCategory: {
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
