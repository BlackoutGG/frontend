import { _roles as types } from "~/utilities/types/roles.js";
import { snackbar } from "~/utilities/types/snackbar.js";

const state = () => ({
  roles: [],
  selected: [],

  keys: [],

  queryParams: {
    page: 1,
    limit: 20,
    total: 0,
    orderBy: "DESC",
    sortBy: "id"
  }
});

const getters = {
  [types.getters.ROLES]: state => state.roles,
  [types.getters.SELECTED]: state => state.selected,
  [types.getters.GET_ROLE]: state => id =>
    state.roles.find(role => role.id === id),
  [types.getters.QUERY_PARAMS]: state => key =>
    typeof key !== undefined ? state.queryParams[key] : state.queryParams,
  [types.getters.PERM_KEYS]: state => state.keys
};

const mutations = {
  [types.mutations.SET_ROLES](state, payload) {
    state.roles = payload;
  },

  [types.mutations.SET_SELECTED](state, selected) {
    state.selected = selected;
  },

  [types.mutations.SET_PARAM](state, { param, value }) {
    state.queryParams[param] = value;
  },

  [types.mutations.SET_PERMISSIONS](state, { roleId, perms }) {
    const role = state.roles.find(role => role.id === roleId);
    if (role) role.permissions = perms;
  },

  [types.mutations.SET_KEYS](state, keys) {
    state.keys = keys;
  },

  [types.mutations.SET_NAME](state, { roleId, name }) {
    const role = state.roles.find(({ id }) => id === roleId);
    if (role) role.name = name;
  }
};

const actions = {
  async [types.actions.FETCH]({ commit, dispatch, state }, root) {
    try {
      const { data } = await this.$axios.get(`/api/roles`, {
        params: { ...state.queryParams }
      });

      commit(types.mutations.SET_ROLES, data.roles.results);
      commit(types.mutations.SET_PARAM, {
        param: "total",
        value: data.roles.total
      });

      if (root) {
        const text = "Content Loaded.";
        dispatch(snackbar.actions.TOGGLE_BAR, { text }, { root: true });
      }
    } catch (err) {
      const text = err.message;
      dispatch(snackbar.actions.TOGGLE_BAR, { text }, { root: true });
      console.log(err.response);
    }
  },

  async [types.actions.FETCH_PERM_KEYS]({ commit }) {
    try {
      const {
        data: { keys }
      } = await this.$axios.get("/api/roles/keys");

      commit(types.mutations.SET_KEYS, keys);
    } catch (err) {}
  },

  async [types.actions.FETCH_PERMS]({ commit, dispatch }, id) {
    try {
      const {
        data: { permissions }
      } = await this.$axios.get(`/api/roles/perms/${id}`);

      commit(types.mutations.SET_PERMISSIONS, {
        roleId: id,
        perms: permissions
      });
    } catch (err) {
      const text = err.message;
      dispatch(snackbar.actions.TOGGLE_BAR, { text }, { root: true });
      console.log(err.response);
    }
  },

  async [types.actions.EDIT_ROLE]({ commit, dispatch }, {id, payload}) {
    try {
      const {
        data: { role } = await this.$axios.put(`/api/roles/${id}`, payload)
      }
  
      if (role.name) {
        commit(types.mutations.SET_NAME, { 
          roleId: role.id, 
          name: role.name 
        });
      }

      if (role.permissions && Object.keys(role.permissions).length) {
        commit(types.mutations.SET_PERMISSIONS, {
          roleId: role.id,
          permissions: role.permissions
        });
      }
    } catch (err) {

    }
  }
};

export default { state, getters, mutations, actions };
