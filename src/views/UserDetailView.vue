<template>
  <UserDetail v-if="user" :user="user" :showDetails="false"></UserDetail>
</template>

<script>
import UserDetail from "@/components/members/UserDetail";
import UserRepository from "@/repositories/UserRepository";

export default {
  name: "UserDetailView",
  data() {
    return {
      user: null,
    };
  },
  components: {
    UserDetail,
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        this.user = await UserRepository.findOneWithEvents(
          this.$route.params.id
        );
      } catch (err) {
        console.error(err);
      }
    },
  },
};
</script>

<style scoped></style>
