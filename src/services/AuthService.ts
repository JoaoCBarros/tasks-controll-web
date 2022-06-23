import axios from "axios";

const apiUrl = "http://localhost:3001";

export const authService = {
  async authenticate(data: any) {
    const endpoint = `${apiUrl}/auth`;
    return axios.post(endpoint, data);
  },

  setLoggerUser(data: any) {
    let parsedData = JSON.stringify(data);
    localStorage.setItem("user", parsedData);
  },

  getLoggerUser() {
    let data = localStorage.getItem("user");
    if (!data) return null;

    try {
      let parsedData = JSON.parse(data);
      return parsedData;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
};
