<template>
  <div class="text-start p-2">
    <h2 class="m-2">{{ title }}</h2>
    <div class="d-flex flex-wrap justify-content-start">
      <div v-for="category in categories" :key="category.id">
        <EventCategoryCard
          :eventCategory="category"
          @subscribers="updateSubscribers"
        ></EventCategoryCard>
      </div>
    </div>
    <div v-if="categories.length === 0" class="text-center mt-2">
      <h2>No Categories</h2>
    </div>
  </div>
</template>

<script>
import EventCategoryCard from "@/components/categories/EventCategoryCard.vue";
import { updateSubscribers } from "@/common/eventCategory";

export default {
  name: "EventCategoriesList",
  props: {
    title: {
      // the title to show in the component
      type: String,
      required: true,
    },
    getCategories: {
      // the function to retrieve the categories
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      categories: [],
    };
  },
  components: { EventCategoryCard },
  methods: {
    updateSubscribers,
  },
  async mounted() {
    this.categories = await this.getCategories();
  },
};
</script>

<style scoped></style>
