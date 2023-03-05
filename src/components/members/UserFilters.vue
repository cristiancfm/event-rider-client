<template>
  <div class="mt-3 mb-3">
    <form>
      <fieldset
        class="reset-style bg-gradient bg-light"
        style="border-radius: 10px"
      >
        <legend class="reset-style ps-2 pe-2">Filters</legend>
        <div class="d-flex flex-wrap">
          <div class="col me-3" style="min-width: 150px; max-width: 300px">
            <label for="user-name" class="form-label m-0 mt-1">
              Member Name
            </label>
            <input type="text" class="form-control" id="user-name" />
          </div>
        </div>
      </fieldset>
    </form>
  </div>
</template>

<script>
export default {
  name: "UserFilters",
};
</script>

<style scoped>
.reset-style {
  all: revert;
}
</style>
