<template>
  <AppNavbar></AppNavbar>
  <!--  With the key, any change to the path will trigger a reload of the component,
   event if it is the same component being loaded -->
  <router-view :key="$route.fullPath" />
</template>

<script>
import AppNavbar from "@/components/AppNavbar";

export default {
  components: { AppNavbar },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  cursor: pointer;
}

/* fixing popper warning in bootstrap 5.2: */
.dropdown-menu {
  margin-top: 0px !important;
}
</style>
