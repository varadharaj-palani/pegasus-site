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

export const apiPay = async (data) => {
  try {
    const response = await api.post("instapay", data);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const apiPayBill = async (data) => {
  try {
    const response = await api.post("payBill", data);
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

export const apiDisplayAccount = async (config) => {
  try {
    const response = await api.get("accountList", config);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const apiGetAccount = async (config,type,acct) => {
  try {
    const response = await api.get(`account/${type}/${acct}`, config);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const apiGetSavAccount = async (config) => {
  try {
    const response = await api.get(`savAccount`, config);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const apiGetBeneficiary = async (data) => {
  console.log(data);
  try {
    const response = await api.post(`beneficiary`, data);
    return response;
  } catch (error) {
    return error.response;
  }
};


export const apiAddBeneficiary = async (data) => {
  try {
    const response = await api.post("addBeneficiary", data);
    return response
  } catch (error) {
    return error.response;
  }
};

export const apiCheckPassword = async (data) => {
  try {
    const response = await api.post(`checkPassword`, data);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const apiAddloanacc = async (data) => {
  try {
    const response = await api.post("addLoan", data);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const apiProfile = async (config) => {
  try {
    const response = await api.get("profile", config);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const apiGetBills = async (config) => {
  try {
    const response = await api.get("bills", config);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const apiGetBillers = async (data) => {
  console.log(data);
  try {
    const response = await api.post(`billers`, data);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const apiAddBiller = async (data) => {
  try {
    const response = await api.post("addBiller", data);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const apiPayNewBill = async (data) => {
  try {
    const response = await api.post("payNewBill", data);
    return response;
  } catch (error) {
    return error.response;
  }
};


export const apiGetHistory = async (config,acct) => {
  console.log(acct);
  try {
    const response = await api.get(`history/${acct}`, config);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const apiApplyLoan = async (config) => {
  try {
    const response = await api.get("ApplyLoan", config);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const apiService = async (config) => {
  try {
    const response = await api.get("Service", config);
    return response;
  } catch (error) {
    return error.response;
  }
};