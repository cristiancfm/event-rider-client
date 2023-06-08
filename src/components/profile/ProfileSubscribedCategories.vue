<template>
  <div class="row">
    <h2>
      <i class="bi bi-star-fill"></i>
      Subscribed
      <span style="font-family: Arial Black, serif">Categories</span>
    </h2>
  </div>
  <div class="row" style="border-top: 1px solid gainsboro">
    <EventCategoriesList
      :title="''"
      :get-categories="getSubscribedCategories"
    />
  </div>
</template>

<script>
import UserRepository from "@/repositories/UserRepository";
import { getStore } from "@/common/store";
import EventCategoriesList from "@/components/categories/EventCategoriesList.vue";

export default {
  name: "ProfileSubscribedCategories",
  components: { EventCategoriesList },
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  methods: {
    async getSubscribedCategories() {
      return await UserRepository.findUserSubscribedCategories(
        getStore().state.user.id,
        null,
        null
      );
    },
  },
};
</script>

<style scoped></style>
