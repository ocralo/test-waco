import { GET_PROFILE, GET_USERS } from "./../Types";

const UserReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_USERS:
      return {
        ...state,
        userList: payload,
      };

    case GET_PROFILE:
      return { ...state, selectedUser: payload };

    default:
      return { ...state };
  }
};

export default UserReducer;
