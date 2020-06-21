<template>
  <v-data-table
    id="roles"
    show-select
    class="elevation-1"
    v-model="selected"
    :items="roles"
    :headers="headers"
    :server-items-length="queryParams('total')"
    :item-key="'id'"
    @update:page="page"
    @update:sort="sortBy"
  >
    <template v-slot:top>
      <v-toolbar>
        <v-spacer></v-spacer>
        <edit-role ref="edit"></edit-role>
      </v-toolbar>
    </template>
    <template v-slot:item.name="{ item }">
      <table-input
        :endpoint="endpoint"
        :id="item.id"
        :type="'name'"
        :value="item.name"
        :large="true"
      ></table-input>
    </template>
    <template v-slot:item.actions="{ item }">
      <table-actions @edit="$refs.edit.setEditableContent(item.id)" edit disable remove></table-actions>
    </template>
  </v-data-table>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import { roles } from "~/utilities/types/roles.js";

const { mapGetters, mapActions, mapMutations } = createNamespacedHelpers(
  "roles"
);

import TableActions from "./TableActions.vue";
import TableInput from "./TableInput.vue";
import EditRole from "~/components/dialogs/EditRoleDialog.vue";

export default {
  name: "RoleTable",

  components: { TableActions, TableInput, EditRole },

  data() {
    return {
      headers: [
        { text: "name", align: "start", value: "name" },
        { text: "", sortable: false, align: "end", value: "actions" }
      ],
      endpoint: "/api/roles/validate/name"
    };
  },

  methods: {
    ...mapMutations(["setParam", "setSelected"])
  },

  computed: {
    /** this.roles, this.queryParams, this.selected */
    ...mapGetters(["roles", "queryParams"]),

    selected: {
      get() {
        return this.$store.getters[roles.getters.SELECTED];
      },
      set(value) {
        this.setSelected(value);
      }
    },
    page: {
      get() {
        return this.queryParams("page");
      },
      set(value) {
        this.setParam({ param: "page", value });
      }
    },
    sortBy: {
      get() {
        return this.queryParams("sortBy");
      },
      set(value) {
        this.setParam({ param: "sortBy", value });
      }
    },
    limit: {
      get() {
        return this.queryParams("limit");
      },
      set(value) {
        this.setParam({ param: "limit", value });
      }
    }
  }
};
</script>

<style lang="scss">
#roles {
  tr {
    height: 60px;
  }
  .text-end {
    text-align: right;
  }
}
</style>