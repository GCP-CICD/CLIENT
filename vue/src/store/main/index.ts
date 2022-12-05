import { create, getPageListData, getSchema } from "@/api/instance1";
import { Module } from "vuex";
import type { IRootState } from "../type";
import commitMapping from "./commitMapping";
import type { IMainState } from "./type";
const main: Module<IMainState, IRootState> = {
  namespaced: true,
  state: {
    employees: [],
    role: [],
    schema: [],
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}`];
      };
    },
  },
  mutations: {
    ["EMPLOYEES"](state, payload) {
      state.employees = payload;
    },
    ["ROLE"](state, payload) {
      state.role = payload;
    },
    ["SCHEMA"](state, payload) {
      state.schema = payload;
    },
  },
  actions: {
    async getPageList({ commit }, { pageName, query }) {
      const url = `/main/${pageName}`;
      const res = await getPageListData(url, query);
      commit((commitMapping as Map<any, any>).get(pageName), res.data);
    },
    async getSchema({ commit }, payload) {
      const res = await getSchema(payload);
      commit("SCHEMA", res);
    },
    async create({ dispatch, state, getters, commit }, { pageName, data }) {
      const url = `/${pageName}`;
      const res = await create(url, data);
      dispatch("setMessage", { message: "新增成功", type: "success" }, { root: true });
      // dispatch("getPageList", { pageName });
    },
  },
  modules: {},
};

export default main;
