<template>
  <div class="m-auto" style="max-width: 720px">
    <div class="text-start p-2">
      <h2 class="m-2">Edit Profile</h2>
      <div class="row p-2">
        <div class="col-3">
          <img
            :src="getImageSrc()"
            class="d-block w-100"
            alt="Profile image"
            @error="setPlaceholder"
          />
          <div class="text-center">
            <button class="btn btn-secondary mt-2">Change picture</button>
          </div>
        </div>
        <div class="col-9">
          <form @submit.prevent="updateProfile()">
            <div class="mb-2">
              <label for="name" class="form-label">Name / Organization</label>
              <input
                type="text"
                class="form-control"
                id="name"
                v-model="profileForm.name"
                required
              />
            </div>
            <div class="mb-2">
              <label for="surname" class="form-label">Surname (optional)</label>
              <input
                type="text"
                class="form-control"
                id="surname"
                v-model="profileForm.surname"
              />
            </div>
            <div class="mb-2">
              <label for="email" class="form-label">Email Address</label>
              <input
                type="text"
                class="form-control"
                id="email"
                v-model="profileForm.email"
                required
                minlength="4"
              />
            </div>
            <div class="mb-2">
              <label for="biography" class="form-label">Biography</label>
              <textarea
                class="form-control"
                id="biography"
                v-model="profileForm.biography"
              />
            </div>
            <button
              type="submit"
              class="btn btn-primary mt-2"
              @click="profileForm.error = null"
            >
              Update Profile
            </button>
            <router-link class="btn btn-secondary mt-2 ms-2" to="/profile">
              Cancel
            </router-link>
            <div
              class="alert alert-danger alert-dismissible fade show mt-3"
              role="alert"
              v-if="profileForm.error"
            >
              <strong>Error:</strong> {{ profileForm.error }}
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
                @click="profileForm.error = null"
              ></button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { BACKEND_URL } from "@/constants";
import { getStore } from "@/common/store";
import auth from "@/common/auth";

export default {
  name: "ProfileEdit",
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      profileForm: {
        id: null,
        name: null,
        surname: null,
        email: null,
        biography: null,
        error: null,
      },
    };
  },
  methods: {
    getImageSrc() {
      if (this.user.image) {
        return `${BACKEND_URL}/users/${this.user.id}/image`;
      }
      return "/profile-placeholder.jpg";
    },
    setPlaceholder(event) {
      event.target.src = "/placeholder-square.png";
    },
    async updateProfile() {
      try {
        await auth.update(this.profileForm);
        this.$router.go(-1);
      } catch (err) {
        const response = JSON.parse(err.request.response);
        this.profileForm.error = response.message;
        console.error(err);
      }
    },
  },
  computed: {
    isLogged() {
      return getStore().state.user.logged;
    },
  },
  mounted() {
    this.profileForm.id = this.user.id;
    this.profileForm.name = this.user.name;
    this.profileForm.surname = this.user.surname;
    this.profileForm.email = this.user.email;
    this.profileForm.biography = this.user.biography;
    /* TODO arreglar que no se muestra nada cuando se cambia el email y se
    vuelve a entrar en editar perfil */
  },
};
</script>

<style scoped></style>
