import { SET_USER_LIST } from "../type";

const initialState = {
  users: [
    {
      id: "",
      username: "",
      email: "",
      verified: "",
      phone: "",
      address: "",
      avatar: "",
      role: "",
      provider: "",
    },
  ],
};

export default function (state = initialState, payload) {
  switch (payload.type) {
    case SET_USER_LIST: {
      return { ...state, users: payload.users };
    }
    default:
      return state;
  }
}
