import AdminService from "../../service/AdminService";
import { SET_USER_LIST } from "../type";

export const doGetUserList = () => async (dispatch) => {
  await AdminService.getUserList()
    .then((res) => {
      let users = res.data;

      dispatch({ type: SET_USER_LIST, users: [...users] });
    })
    .catch(() => {
      // window.location = "/admin/auth";
    });
};
