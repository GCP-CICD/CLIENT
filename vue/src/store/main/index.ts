import { createData, getSchema, readData } from "@/api/instance1";
import { Module } from "vuex";
import type { IRootState } from "../type";
import commitMapping from "./commitMapping";
import type { IMainState } from "./type";
const main: Module<IMainState, IRootState> = {
  namespaced: true,
  state: {
    employees: [],
    role: [],
    route: [],
    schema: [],
    count: 0,
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}`];
      };
    },
    getCount: (state) => state.count,
  },
  mutations: {
    ["EMPLOYEES"](state, payload) {
      state.employees = payload;
    },
    ["ROLE"](state, payload) {
      state.role = payload;
    },
    ["ROUTE"](state, payload) {
      state.route = payload;
    },
    ["SCHEMA"](state, payload) {
      state.schema = payload;
    },
    ["COUNT"](state, payload) {
      state.count = payload;
    },
  },
  actions: {
    async getSchema({ commit }, payload) {
      const res = await getSchema(payload);
      commit("SCHEMA", res);
    },
    async createData({ dispatch, state, getters, commit }, { pageName, data }) {
      const url = `/${pageName}`;
      const res = await createData(url, data);
      dispatch("setMessage", { message: "新增成功", type: "success" }, { root: true });
      // dispatch("readData", { pageName });
    },
    async readData({ commit }, { pageName, query }) {
      const url = `/${pageName}`;
      const res = await readData(url, query);

      commit((commitMapping as Map<any, any>).get(pageName), res.data);
      commit("COUNT", res.count);
    },
    async updateData({ dispatch, state, getters, commit }, { pageName, data }) {
      console.log("updateData");
    },
    async deleteData({ dispatch, state, getters, commit }, { pageName, data }) {
      console.log("deleteData");
    },
  },
  modules: {},
};

export default main;
