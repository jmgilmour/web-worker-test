<template>
  <div class="detail">
    <div>Name: {{ user && user.name }}</div>
    <div>Viewers: {{ user && user.viewers }}</div>
  </div>
</template>

<script>
import RecordsCache from "./RecordsCache";

export default {
  data: () => ({
    user: null,
  }),

  mounted() {
    this.id = Math.floor(Math.random() * 10) + 1;
    RecordsCache.addTransactionHandler(this.handleTransaction);
    RecordsCache.findBy("address.zipcode", "31428-2261").then(this.setUser);
    // RecordsCache.getById(this.id).then(this.setUser);
  },

  destroyed() {
    RecordsCache.removeTransactionHandler(this.handleTransaction);
  },

  methods: {
    setUser(user) {
      this.user = user;
    },

    handleTransaction(transaction) {
      let id = this.user && this.user.id;

      const { add, update } = transaction;
      if (id && add && add.id === id) this.user = add;
      if (id && update && update.id === id) this.user = update;
    },
  },
};
</script>

<style scoped>
.detail {
  padding: 1em;
  margin: 0.5em;
  border: thin solid gray;
}
</style>
