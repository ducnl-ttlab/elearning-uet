import { createStore } from "vuex";
import axios from "axios";
import { getCategoryPage } from '../services/category';

export default createStore({
  state: {
    courses: [
        {
          "id": 1,
          "name": "IT và phần mềm",
          "image": "http://localhost:5000/category/image/software",
          "avgRating": 5,
          "courseTotal": 0,
          "studentTotal": 0
        },
        {
          "id": 2,
          "name": "Kinh doanh",
          "image": "http://localhost:5000/category/image/business",
          "avgRating": 5,
          "courseTotal": 1,
          "studentTotal": 2
        },
        {
          "id": 3,
          "name": "sáng tạo",
          "image": "http://localhost:5000/category/image/design",
          "avgRating": 5,
          "courseTotal": 2,
          "studentTotal": 4
        },
        {
          "id": 4,
          "name": "Phát triển bản thân",
          "image": "http://localhost:5000/category/image/personal-development",
          "avgRating": 5,
          "courseTotal": 3,
          "studentTotal": 6
        },
        {
          "id": 5,
          "name": "Kinh doanh",
          "image": "http://localhost:5000/category/image/marketing",
          "avgRating": 5,
          "courseTotal": 4,
          "studentTotal": 8
        },
        {
          "id": 6,
          "name": "Lập trình",
          "image": "http://localhost:5000/category/image/development",
          "avgRating": 5,
          "courseTotal": 5,
          "studentTotal": 10
        },
        {
          "id": 7,
          "name": "Nghệ thuật",
          "image": "http://localhost:5000/category/image/music",
          "avgRating": 5,
          "courseTotal": 6,
          "studentTotal": 12
        },
        {
          "id": 8,
          "name": "Nhiếp ảnh",
          "image": "http://localhost:5000/category/image/photography",
          "avgRating": 5,
          "courseTotal": 7,
          "studentTotal": 14
        }
      ],
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