<template>
  <div class="text-start m-4">
    <h1>Members</h1>
    <UserFilters />
    <div class="d-flex flex-wrap justify-content-start">
      <div v-for="user in users" :key="user.id">
        <UserCard :user="user"></UserCard>
      </div>
    </div>
  </div>
</template>

<script>
import UserRepository from "@/repositories/UserRepository";
import UserCard from "@/components/members/UserCard";
import UserFilters from "@/components/members/UserFilters";
export default {
  name: "UsersView.vue",
  data() {
    return {
      users: [],
    };
  },
  components: { UserCard, UserFilters },
  mounted() {
    UserRepository.findAll().then((response) => {
      this.users = response;
    });
  },
};
</script>

<style scoped></style>
