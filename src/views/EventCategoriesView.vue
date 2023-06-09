<template>
  <EventCategoriesList
    :title="`event <span style='font-family: Arial Black, serif'>categories</span>`"
    :get-categories="getCategories"
  />
</template>

<script>
import EventCategoriesRepository from "@/repositories/EventCategoryRepository";
import EventCategoriesList from "@/components/categories/EventCategoriesList.vue";

export default {
  name: "EventCategoryView",
  components: { EventCategoriesList },
  methods: {
    async getCategories() {
      return await EventCategoriesRepository.findAll();
    },
  },
};
</script>

<style scoped></style>
