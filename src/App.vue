<template>
  <div id="app">
    <div class="controls">
      <button @click="showGrid = !showGrid">
        Grid {{ showGrid ? "On" : "Off" }}
      </button>
      <button @click="showDetail = !showDetail">
        Detail {{ showDetail ? "On" : "Off" }}
      </button>
    </div>

    <grid v-if="showGrid" />
    <detail v-if="showDetail" />
  </div>
</template>

<script>
import Detail from "./Detail";
import Grid from "./Grid";

import UserDataLoader from "./UserDataLoader";

export default {
  components: { Detail, Grid },

  data: () => ({
    showGrid: false,
    showDetail: false,
  }),

  mounted() {
    [...Array(10).keys()].forEach((id) => UserDataLoader.load(id + 1));
  },
};
</script>

<style scoped>
.controls {
  display: flex;
  justify-content: space-around;
  margin-bottom: 1em;
}
</style>
