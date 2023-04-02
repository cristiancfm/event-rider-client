<template>
  <div class="text-start p-2">
    <h2 class="m-2">Event Categories</h2>
    <div class="d-flex flex-wrap justify-content-start">
      <div v-for="eventCategory in eventCategories" :key="eventCategory.id">
        <EventCategoryCard
          :eventCategory="eventCategory"
          @subscribers="updateSubscribers"
        ></EventCategoryCard>
      </div>
    </div>
  </div>
</template>

<script>
import EventCategoryCard from "@/components/categories/EventCategoryCard";
import EventCategoriesRepository from "@/repositories/EventCategoryRepository";
import { updateSubscribers } from "@/common/eventCategory";

export default {
  name: "EventCategoryView",
  data() {
    return {
      eventCategories: [],
    };
  },
  components: { EventCategoryCard },
  methods: {
    updateSubscribers,
  },
  mounted() {
    EventCategoriesRepository.findAll().then((response) => {
      this.eventCategories = response;
    });
  },
};
</script>

<style scoped></style>
