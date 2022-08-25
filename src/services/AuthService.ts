import axios from "axios";

const apiUrl = process.env.REACT_APP_API;
const authLocalStorage = "tasks-controll@user";
export const authService = {
  async authenticate(data: any) {
    const endpoint = `${apiUrl}/login`;
    return axios.post(endpoint, data);
  },

  setLoggerUser(data: any) {
    const parsedData = JSON.stringify(data);
    localStorage.setItem(authLocalStorage, parsedData);
  },

  getLoggerUser() {
    const data = localStorage.getItem(authLocalStorage);
    if (!data) return null;

    try {
      const parsedData = JSON.parse(data);
      return parsedData;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  loggout() {
    const endpoint = `${apiUrl}/loggout`;
    return axios.post(
      endpoint,
      {},
      {
        headers: {
          Authorization: `Bearer ${this.getLoggerUser()}`,
        },
      }
    );
  },
};
