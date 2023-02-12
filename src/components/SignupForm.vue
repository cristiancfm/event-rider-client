<template>
  <h1 class="mt-3">Sign Up</h1>
  <form class="w-25 m-auto mt-2">
    <div class="mb-2 text-start">
      <label for="name" class="form-label">Name</label>
      <input
        type="text"
        class="form-control"
        id="name"
        v-model="signupForm.name"
      />
    </div>
    <div class="mb-2 text-start">
      <label for="surname" class="form-label">Surname</label>
      <input
        type="text"
        class="form-control"
        id="surname"
        v-model="signupForm.surname"
      />
    </div>
    <div class="mb-2 text-start">
      <label for="email" class="form-label">Email Address</label>
      <input
        type="text"
        class="form-control"
        id="email"
        v-model="signupForm.email"
      />
    </div>
    <div class="mb-2 text-start">
      <label for="password" class="form-label">Password</label>
      <input
        type="password"
        class="form-control"
        id="password"
        v-model="signupForm.password"
      />
    </div>
    <button
      type="submit"
      class="btn btn-primary mt-2"
      @click.prevent="signup()"
    >
      Submit
    </button>
  </form>
</template>

<script>
import auth from "@/common/auth";

export default {
  data() {
    return {
      signupForm: {
        name: null,
        surname: null,
        email: null,
        password: null,
      },
    };
  },
  methods: {
    async signup() {
      try {
        await auth.signup(this.signupForm);
        this.$router.go(-1);
      } catch (err) {
        console.error(err);
      }
    },
  },
};
</script>
