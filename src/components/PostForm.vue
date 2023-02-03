<template>
  <div class="container">
    <form class="formulario">
      <div class="mb-3">
        <label for="body" class="form-label">Mensaje</label>
        <input type="text" class="form-control" id="body" v-model="post.body" />
      </div>
      <div class="mb-3">
        <label for="select" class="form-label">Autoría</label>
        <select class="form-select" id="select" v-model="post.author">
          <option selected>Seleccione un autor/a</option>
          <option v-for="autor in authors" :key="autor.id" :value="autor">
            {{ autor.login }}
          </option>
        </select>
      </div>
      <div class="mb-3">
        <button
          class="btn btn-secondary"
          @click.prevent="iniciarSubidaFichero()"
        >
          Elegir imagen
        </button>
        <span v-if="auxImagen"> Ha elegido la imagen {{ auxImagen }} </span>
        <input
          ref="inputOculto"
          type="file"
          class="d-none"
          @change="actualizarSubidaFichero()"
        />
      </div>
      <button
        type="submit"
        class="btn btn-primary"
        @click.prevent="guardarPost()"
      >
        Guardar
      </button>
    </form>
  </div>
</template>

<script>
import PostRepository from "@/repositories/PostRepository";
import UserRepository from "@/repositories/UserRepository.js";

export default {
  data() {
    return {
      auxImagen: null,
      authors: [],
      post: {
        body: null,
        author: null,
      },
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    actualizarSubidaFichero() {
      this.auxImagen = this.$refs.inputOculto.files[0].name;
    },
    iniciarSubidaFichero() {
      this.$refs.inputOculto.click();
    },
    async fetchData() {
      this.authors = await UserRepository.findAll();
    },
    async guardarPost() {
      try {
        const postAux = await PostRepository.save(this.post);
        await PostRepository.saveImage(
          postAux.id,
          this.$refs.inputOculto.files[0]
        );
        this.$router.push("/posts/" + postAux.id);
      } catch (err) {
        console.error(err);
      }
    },
  },
};
</script>

<style scoped>
.formulario {
  margin: 10px auto;
  max-width: 40%;
}
</style>
