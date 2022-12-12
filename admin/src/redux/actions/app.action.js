import { SET_NOTIFICATION } from "../type";

export const setNotification =
  (type, title, description) => async (dispatch) => {
    try {
      let notification = {
        type,
        title,
        description,
      };
      dispatch({ type: SET_NOTIFICATION, notification });
    } catch ({ message }) {}
  };
