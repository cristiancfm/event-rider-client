<template>
  <div class="text-start p-2">
    <h2 class="m-2">Members</h2>
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

export default {
  name: "UsersView.vue",
  data() {
    return {
      users: [],
    };
  },
  components: { UserCard },
  mounted() {
    UserRepository.findAllWithEvents().then((response) => {
      this.users = response;
    });
  },
};
</script>

<style scoped></style>
