import { createStore } from "vuex";
import axios from "axios";
import { getCategoryPage } from '../services/category';

export default createStore({
  state: {
    courses: [
      ]
  },
  getters: {
    getCourses: (state) => state.courses,
  },
  actions: {
    async fetchcourses({ commit }) {
      try {
        const data = await getCategoryPage();
        commit("SET_COURSES", data.data);
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
  },
  mutations: {
    SET_COURSES(state, courses) {
      state.courses = courses;
    },
  },
});