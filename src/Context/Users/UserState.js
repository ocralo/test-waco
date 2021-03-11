import React, { useReducer } from "react";

import axios from "axios";

import UserReducer from "./UserReducer";
import UserContext from "./UserContext";
import { GET_PROFILE, GET_USERS } from "./../Types";

const UserState = (props) => {
  const InitialState = {
    userList: [],
    selectedUser: null,
  };

  const [state, dispatch] = useReducer(UserReducer, InitialState);

  const getUsers = async () => {
    const res = await axios.get("https://reqres.in/api/users");
    dispatch({
      type: GET_USERS,
      payload: res.data.data,
    });
    console.log("getUsers", res.data.data);
  };

  const getProfile = async (id) => {
    const res = await axios.get("https://reqres.in/api/users/" + id);
    dispatch({
      type: GET_PROFILE,
      payload: res.data.data,
    });
    console.log(res.data.data);
  };

  return (
    <UserContext.Provider
      value={{
        userList: state.userList,
        selectedUser: state.selectedUser,
        getUsers,
        getProfile,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
