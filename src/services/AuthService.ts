import axios from "axios";

const apiUrl = process.env.REACT_APP_API;

export const authService = {
  async authenticate(data: any) {
    const endpoint = `${apiUrl}/auth`;
    return axios.post(endpoint, data);
  },

  setLoggerUser(data: any) {
    const parsedData = JSON.stringify(data);
    localStorage.setItem("user", parsedData);
  },

  getLoggerUser() {
    const data = localStorage.getItem("user");
    if (!data) return null;

    try {
      const parsedData = JSON.parse(data);
      return parsedData;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
};
