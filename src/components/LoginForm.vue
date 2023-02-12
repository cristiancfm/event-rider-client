<template>
  <h1 class="mt-3">Log In</h1>
  <form class="w-25 m-auto mt-2">
    <div class="mb-2 text-start">
      <label for="email" class="form-label">Email Address</label>
      <input
        type="text"
        class="form-control"
        id="email"
        v-model="loginForm.email"
      />
    </div>
    <div class="mb-2 text-start">
      <label for="password" class="form-label">Password</label>
      <input
        type="password"
        class="form-control"
        id="password"
        v-model="loginForm.password"
      />
    </div>
    <button type="submit" class="btn btn-primary mt-2" @click.prevent="login()">
      Submit
    </button>
  </form>
</template>

<script>
import auth from "@/common/auth";

export default {
  data() {
    return {
      loginForm: {
        email: null,
        password: null,
      },
    };
  },
  methods: {
    async login() {
      try {
        await auth.login(this.loginForm);
        this.$router.go(-1);
      } catch (err) {
        console.error(err);
      }
    },
  },
};
</script>
