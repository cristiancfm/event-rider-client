<template>
  <nav class="navbar navbar-expand-lg bg-light">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">
        <img
          src="../assets/event-rider-logo.png"
          alt="Event Rider"
          width="150"
        />
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link
              to="/"
              class="nav-link"
              aria-current="page"
              active-class="active"
            >
              Home
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/events" active-class="active">
              Events
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              to="/categories"
              active-class="active"
            >
              Categories
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/members" active-class="active">
              Members
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/about" active-class="active">
              About
            </router-link>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              ref="dropdownElement"
            >
              Dropdown
            </a>
            <ul class="dropdown-menu">
              <li>
                <router-link
                  class="dropdown-item"
                  to="/posts"
                  active-class="active"
                  >Como vue 2</router-link
                >
              </li>
              <li>
                <router-link
                  class="dropdown-item"
                  to="/posts-setup"
                  active-class="active"
                  >Script setup</router-link
                >
              </li>
            </ul>
          </li>
          <li class="nav-item" v-if="!isLogged">
            <router-link
              class="nav-link btn btn-primary"
              to="/login"
              active-class="active"
            >
              Log In
            </router-link>
          </li>
          <li class="nav-item" v-if="!isLogged">
            <router-link
              class="nav-link btn btn-primary"
              to="/signup"
              active-class="active"
            >
              Sign Up
            </router-link>
          </li>
          <li class="nav-item" v-if="isLogged">
            <router-link class="nav-link" to="/profile" active-class="active">
              Profile
            </router-link>
          </li>
          <li class="nav-item" v-if="isLogged">
            <a class="nav-link btn btn-primary" @click="logout()"> Log Out </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <router-view />
</template>

<script>
import auth from "@/common/auth";
import { getStore } from "@/common/store";

export default {
  name: "AppNavbar",
  data() {
    return {
      store: getStore(),
    };
  },
  computed: {
    isLogged() {
      return this.store.state.user.logged;
    },
  },
  methods: {
    logout() {
      auth.logout();
      // Después de hacer logout nos vamos a home
      if (this.$router.currentRoute.name != "home") {
        this.$router.push({ name: "home" });
      }
    },
  },
};
</script>
