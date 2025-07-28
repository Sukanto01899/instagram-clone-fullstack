import instance from "./axios";

const api = instance.interceptors.request.use(
  (config) => {
    // You can add any request modifications here if needed
    return config;
  },
  (error) => {
    // Handle request errors here
    return Promise.reject(error);
  }
);


const apiResponse = instance.interceptors.response.use(
  (response) => {
    // You can add any response modifications here if needed
    return response;
  },
  (error) => {
    // Handle response errors here
    return Promise.reject(error);
  }
);
export { api, apiResponse };

export default instance;