<template>
  <div class="text-start p-2">
    <h2 class="m-2">Follower Members</h2>
    <div class="d-flex flex-wrap justify-content-start">
      <div v-for="user in users" :key="user.id">
        <UserCard :user="user" @followers="updateFollowers"></UserCard>
      </div>
    </div>
  </div>
</template>

<script>
import UserRepository from "@/repositories/UserRepository";
import UserCard from "@/components/users/UserCard";
import { updateFollowers } from "@/common/user";
import { getStore } from "@/common/store";

export default {
  name: "ProfileFollowers",
  data() {
    return {
      users: [],
    };
  },
  components: { UserCard },
  methods: {
    updateFollowers,
  },
  mounted() {
    UserRepository.findUserFollowers(getStore().state.user.id, null, null).then(
      (response) => {
        this.users = response;
      }
    );
  },
};
</script>

<style scoped></style>
