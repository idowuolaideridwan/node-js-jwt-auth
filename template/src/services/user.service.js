import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/v1/";

const getPublicContent = () => {
  return axios.get(API_URL + "payment/applicantList", { headers: authHeader() })
  .then((response) => {
    return response.data.data;
  });
};

const getRevenueInformation = () => {
  return axios.get(API_URL + "payment/aggregator", { headers: authHeader() })
  .then((response) => {
    return response.data.data;
  });
};

const getAppointmentList = () => {
  return axios.get(API_URL + "payment/appointmentList", { headers: authHeader() })
  .then((response) => {
    return response.data.data;
  });
};

const getRefundList = () => {
  return axios.get(API_URL + "payment/refundList", { headers: authHeader() })
  .then((response) => {
    return response.data.data;
  });
};

const getUserList = () => {
  return axios.get(API_URL + "user/allUser", { headers: authHeader() })
  .then((response) => {
    return response.data.data;
  });
};

const updateUser = (name, username, email , member_id ) => {
  return axios.put(API_URL + "user/update",{name, username, email , member_id }, { headers: authHeader() });
  };

const UserService = {
  getPublicContent,
  getRevenueInformation,
  getAppointmentList,
  getRefundList,
  getUserList,
  updateUser,
};
export default UserService;