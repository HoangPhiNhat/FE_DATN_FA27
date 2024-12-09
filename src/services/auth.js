/* eslint-disable no-useless-catch */
// import instance from "../configs/axios";
// import axios from "axios";
import UnAuthor from "./baseApi/UnAuthorApi";
// const url = "/auth";
import Author from "./baseApi/AuthorApi";

export const signIn = async (user) => {
  try {
    return await UnAuthor.post("/login", user);
  } catch (error) {
    throw error;
  }
};
export const updateProfile = async (data) => {
  try {
    const res = await Author.post("auth/profile", data);
    return res;
  } catch (error) {
    throw error;
  }
};
export const profile = async () => {
  try {
    const res = await Author.get("auth/profile");
    return res.data;
  } catch (error) {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    window.location.href = "/sign-in";
    throw error;
  }
};

export const signUp = (user) => {
  return UnAuthor.post(`/register`, user);
};

export const refreshToken = async () => {
  try {
    const data = await UnAuthor.post(`/refresh`, {
      refresh_token: localStorage.getItem("refresh_token"), // Thêm refresh token vào body
    });
    localStorage.setItem("access_token", data.access_token);
    localStorage.setItem("refresh_token", data.refresh_token);
  } catch (error) {
    // refresh token is expired
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    if (error.response.status === 400) {
      window.location.href = "/signin";
    }
  }
};

// export const resendActiveAccountEmail = (username) => {
//     return UnauthorApi.get(`${url}/registration/active-mail?username=${username}`);
// };

// export const sendResetPasswordEmail = (usernameOrEmail) => {
//     return UnauthorApi.get(`${url}/password/forgot-mail?usernameOrEmail=${usernameOrEmail}`);
// };

// export const getUsernameFromForgotPasswordToken = (token) => {
//     return UnauthorApi.get(`${url}/password/forgot/username?forgotPasswordToken=${token}`);
// };

// export const resetNewPassword = (token, newPassword) => {
//     const body = {
//         "forgotPasswordToken": token,
//         "newPassword": newPassword
//     };

//     return UnauthorApi.put(`${url}/password/new-password`, body);
// };

export const changePassword = (data) => {
  const body = {
    password_confirmation: data.confirm_password,
    password: data.password,
    current_password: data.current_password,
  };
  return Author.post(`/auth/changePassword`, body);
};

export const resetPasswordEmail = async (data) => {
  try {
    return await UnAuthor.post(`/password/email`, data);
  } catch (error) {
    throw error;
  }
};

export const resetPassword = async (data) => {
  try {
    return await UnAuthor.post(`/password/reset`, data);
  } catch (error) {
    throw error;
  }
};
