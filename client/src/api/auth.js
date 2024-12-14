import axiosInstance from "./main.js";
const url = "http://localhost:5050";

export async function signupUser(input) {
  try {
    const response = await axiosInstance.post(
      url + "/api/v1/auth/signup",
      input
    );

    return response.data;
  } catch (error) {
    return error;
  }
}

export async function loginUser(input) {
  try {
    const response = await axiosInstance.post(
      url + "/api/v1/auth/login",
      input
    );

    return response.data;
  } catch (error) {
    return error;
  }
}
