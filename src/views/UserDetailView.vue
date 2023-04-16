<template>
  <UserDetail
    v-if="user"
    :user="user"
    @followers="updateFollowers"
  ></UserDetail>
</template>

<script>
import UserDetail from "@/components/users/UserDetail";
import UserRepository from "@/repositories/UserRepository";
import { updateFollowers } from "@/common/user";

export default {
  name: "UserDetailView",
  data() {
    return {
      user: null,
    };
  },
  components: { UserDetail },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        this.user = await UserRepository.findOne(this.$route.params.id);
      } catch (err) {
        console.error(err);
      }
    },
    updateFollowers,
  },
};
</script>

<style scoped></style>
