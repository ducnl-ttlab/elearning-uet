import AdminService from "../../service/AdminService";
import { SET_COURSE_LIST } from "../type";

export const doGetCourseList = () => async (dispatch) => {
  await AdminService.getCourseList()
    .then((res) => {
      let courses = res.data;

      dispatch({ type: SET_COURSE_LIST, courses: [...courses] });
    })
    .catch(() => {
      // window.location = "/admin/auth";
    });
};
