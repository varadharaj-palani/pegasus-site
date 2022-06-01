import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/",
})

export const apiLogin = async (data) => {
  try {
    const response = await api.post("auth", data);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const apiAddAccount = async (data) => {
  try {
    const response = await api.post("addAccount", data);
    return response;
  } catch (error) {
    return error.response;
  }
};