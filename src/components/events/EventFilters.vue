<template>
  <div class="mt-3 mb-3">
    <form>
      <fieldset
        class="reset-style bg-gradient bg-light"
        style="border-radius: 10px"
      >
        <legend class="reset-style ps-2 pe-2">Filters</legend>
        <div class="d-flex flex-wrap">
          <div class="col me-3" style="min-width: 150px">
            <label for="event-title" class="form-label m-0 mt-1">
              Event Title
            </label>
            <input type="text" class="form-control" id="event-title" />
          </div>
          <div class="col me-3" style="min-width: 150px">
            <label for="event-location" class="form-label m-0 mt-1">
              Location
            </label>
            <input type="text" class="form-control" id="event-location" />
          </div>
          <div class="col me-3" style="min-width: 150px">
            <label for="event-date" class="form-label m-0 mt-1">Date</label>
            <input type="date" class="form-control" id="event-date" />
          </div>
          <div class="col me-3" style="min-width: 150px">
            <label for="event-distance" class="form-label m-0 mt-1">
              Distance
            </label>
            <select class="form-control" id="event-distance" />
          </div>
          <div class="col me-3" style="min-width: 150px">
            <label for="event-category" class="form-label m-0 mt-1">
              Category
            </label>
            <select class="form-control" id="event-category" />
          </div>
        </div>
      </fieldset>
    </form>
  </div>
</template>

<script>
export default {
  name: "EventFilters",
};
</script>

<style scoped>
.reset-style {
  all: revert;
}
</style>
