<template>
  <div>
    <div v-for="user in sortedUsers" :key="user.id" class="user">
      <div class="name">
        {{ user.name }}
      </div>
      <div class="viewers">
        {{ user.viewers }}
      </div>
    </div>
  </div>
</template>

<script>
import compact from "lodash/compact";
import flow from "lodash/flow";
import sortBy from "lodash/sortBy";
import values from "lodash/values";

import RecordsCache from "./RecordsCache";

export default {
  data: () => ({
    users: {},
  }),

  computed: {
    sortedUsers() {
      return flow(values, compact, (users) => sortBy(users, "id"))(this.users);
    },
  },

  mounted() {
    RecordsCache.addTransactionHandler(this.handleTransaction);
    RecordsCache.streamRecords((records) => {
      records.forEach((record) => this.handleTransaction({ add: record }));
    }, 100);
  },

  destroyed() {
    RecordsCache.removeTransactionHandler(this.handleTransaction);
  },

  methods: {
    handleTransaction(transaction) {
      const { add, update, remove } = transaction;
      if (add) this.$set(this.users, add.id, add);
      if (update) this.$set(this.users, update.id, update);
      if (remove) this.$set(this.users, remove.id, null);
    },
  },
};
</script>

<style scoped>
.user {
  display: flex;
}

.name {
  width: 12em;
}
</style>
