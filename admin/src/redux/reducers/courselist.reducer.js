import { SET_COURSE_LIST } from "../type";

const initialState = {
  courses: [
    {
      id: "",
      categoryId: "",
      instructorId: "",
      name: "",
      description: "",
      isPublished: "",
      price: "",
      image: "",
      startCourseTime: "",
      endCourseTime: "",
      created_at: "",
      updated_at: "",
      instructorName: "",
      email: "",
      address: "",
      phone: "",
      avatar: "",
    },
  ],
};

export default function (state = initialState, payload) {
  switch (payload.type) {
    case SET_COURSE_LIST: {
      return { ...state, courses: payload.courses };
    }
    default:
      return state;
  }
}
