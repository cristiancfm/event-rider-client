<template>
  <div class="container-fluid text-start p-4">
    <div class="row mb-2">
      <div class="col admin-title">
        <h2>
          <i class="bi bi-wrench-adjustable"></i>
          Administration
        </h2>
      </div>
    </div>
    <div class="row">
      <nav class="navbar navbar-expand-md p-0">
        <div class="container-fluid">
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarProfile"
            aria-controls="navbarProfile"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarProfile">
            <ul class="navbar-nav me-auto">
              <li class="nav-item">
                <router-link
                  class="btn btn-secondary me-2 mb-2"
                  to="/admin/events"
                  active-class="active"
                >
                  Events
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  class="btn btn-secondary me-2 mb-2"
                  to="/admin/categories"
                  active-class="active"
                >
                  Categories
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  class="btn btn-secondary me-2 mb-2"
                  to="/admin/members"
                  active-class="active"
                >
                  Members
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
    <br />
    <router-view />
  </div>
</template>

<script>
export default {
  name: "AdminDetail",
};
</script>

<style scoped>
.admin-title {
  background: url("/public/admin-bg.png");
  background-repeat: no-repeat;
  background-position: right;
}
</style>
