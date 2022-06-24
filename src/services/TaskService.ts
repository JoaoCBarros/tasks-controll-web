import axios from "axios";
import { authService } from "./AuthService";

const apiUrl = process.env.REACT_APP_API;

interface TAddTask {
  title: string;
  description: string;
  expiresAt: string;
}
export const taskService = {
  getToken() {
    return authService.getLoggerUser()
      ? authService.getLoggerUser().token
      : null;
  },
  async getTasks() {
    const token = this.getToken();
    const response = await axios.get(`${apiUrl}/tasks`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  },

  async addTask(data: TAddTask) {
    const token = this.getToken();
    const response = await axios.post(`${apiUrl}/tasks`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  },

  async finishTask(taskId: string) {
    const token = this.getToken();
    await axios.put(
      `${apiUrl}/tasks/${taskId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },
};
