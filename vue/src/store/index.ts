import _cache from "@/lib/_cache";
import { addRoute } from "@/router";
import type { Store } from "vuex";
import { createStore, useStore } from "vuex";
import login from "./login";
import main from "./main";

import type { IMessage, IRootState, IStore } from "./type";

export default createStore<IRootState>({
  state: {
    message: { showClose: true, message: "", type: "success" },
  },
  getters: {},
  mutations: {
    ["MESSAGE"](state, payload) {
      state.message = payload;
    },
  },
  actions: {
    addRoute: async ({ state, commit, rootState }, payload) => {
      await addRoute(payload);
    },
    setMessage: async ({ state, commit, rootState }, { showClose = false, message, type = "info" }: IMessage) => {
      commit("MESSAGE", { showClose, message, type });
    },

    handleReload: async ({ state, commit, rootState, dispatch }, payload) => {
      await dispatch("addRoute", _cache.getItem("role", "session"));
      commit("login/USER_INFO", _cache.getItem("userInfo", "session"));
    },
  },

  modules: {
    login,

    main,
  },
});

export function _useStore(): Store<IStore> {
  return useStore();
}
