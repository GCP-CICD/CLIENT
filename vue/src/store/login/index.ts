import { emailLogin } from "@/api/instance1";
import _cache from "@/lib/_cache";
import router from "@/router";
import { Module } from "vuex";
import type { IRootState } from "../type";
import type { ILoginState } from "./type";

const login: Module<ILoginState, IRootState> = {
  namespaced: true,
  state: {
    userInfo: {},
    userMenu: [],
  },
  getters: {},
  mutations: {
    ["USER_INFO"](state, payload) {
      state.userInfo = payload;
    },
    ["USER_MENU"](state, payload) {
      state.userMenu = payload;
    },
  },
  actions: {
    async emailLogin({ state, commit, dispatch }, payload) {
      const res = await emailLogin(payload);

      _cache.setItem("token", res.token, "session");
      _cache.setItem("role", res.info.role_id, "session");
      _cache.setItem("userInfo", res.info, "session");
      commit("USER_INFO", res.info);

      dispatch("addRoute", res.info.role_id, { root: true });
      router.replace({ name: "main" });
    },
  },
  modules: {}, //可以再嵌套一層modules
};

export default login;
