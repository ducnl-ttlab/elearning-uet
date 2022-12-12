import { SET_NOTIFICATION } from "../type";

const initialState = {
  notification: {
    type: "success",
    title: "",
    description: "",
  },
};

export default function (state = initialState, payload) {
  switch (payload.type) {
    case SET_NOTIFICATION:
      return {
        ...state,
        notification: {
          ...state,
          ...payload.notification,
        },
      };
    default:
      return state;
  }
}
