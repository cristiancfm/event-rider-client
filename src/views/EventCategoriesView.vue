<template>
  <div class="text-start m-4">
    <h1>Event Categories</h1>
    <div class="d-flex flex-wrap justify-content-start">
      <div v-for="eventCategory in eventCategories" :key="eventCategory.id">
        <EventCategoryCard :eventCategory="eventCategory"></EventCategoryCard>
      </div>
    </div>
  </div>
</template>

<script>
import EventCategoryCard from "@/components/categories/EventCategoryCard";
import EventCategoriesRepository from "@/repositories/EventCategoriesRepository";

export default {
  name: "EventCategoryView",
  data() {
    return {
      eventCategories: [],
    };
  },
  components: { EventCategoryCard },
  mounted() {
    EventCategoriesRepository.findAll().then((response) => {
      this.eventCategories = response;
    });
  },
};
</script>

<style scoped></style>
