import { createPageData, deletePageData, editPageData, getPageData, getPageSchema } from "@/api/instance1";
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
    pageSize: 10,
    currentPage: 1,
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}`];
      };
    },
    getCount: (state) => state.count,
    getPageSize: (state) => state.pageSize,
    getCurrentPage: (state) => state.currentPage,
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
    changePageSize(state, payload) {
      state.pageSize = payload;
    },
    changeCurrentPage(state, payload) {
      state.currentPage = payload;
    },
  },
  actions: {
    async getPageSchema({ commit }, payload) {
      const res = await getPageSchema(payload);
      commit("SCHEMA", res);
    },
    async createPageData({ dispatch, state, getters, commit }, { pageName, data }) {
      const url = `/${pageName}`;
      const res = await createPageData(url, data);
      dispatch("setMessage", { message: "新增成功", type: "success" }, { root: true });
      dispatch("getPageData", { pageName });
    },
    async getPageData({ commit, state }, { pageName, query }) {
      const url = `/${pageName}`;
      if (query) {
        //GET 要先將陣列轉為JSON字串，後端再轉回來
        for (const iterator of Object.entries(query)) {
          if (Array.isArray(iterator[1])) {
            query[iterator[0]] = JSON.stringify(iterator[1]);
          }
        }
      } else {
        // 新增/刪除/編輯 後，不會傳limit,offset
        query = { limit: state.pageSize, offset: (state.currentPage - 1) * state.pageSize };
      }

      const res = await getPageData(url, query);

      commit((commitMapping as Map<any, any>).get(pageName), res.data);
      commit("COUNT", res.count);
    },
    async editPageData({ dispatch, state, getters, commit }, { pageName, id, data }) {
      const url = `/${pageName}/${id}`;
      const res = await editPageData(url, data);
      dispatch("getPageData", { pageName });
    },
    async deletePageData({ dispatch, state, getters, commit }, { pageName, id }) {
      const url = `/${pageName}/${id}`;
      const res = await deletePageData(url);
      dispatch("getPageData", { pageName });
    },
    changePageSize({ commit, state }, payload) {
      commit("changePageSize", payload);
    },
    changeCurrentPage({ commit, state }, payload) {
      commit("changeCurrentPage", payload);
    },
  },
  modules: {},
};

export default main;
