import axios from "axios";
import { authService } from "./AuthService";

const apiUrl = process.env.REACT_APP_API;

interface TAddTask {
  title: string;
  description: string;
  expiresAt: string;
}
export const taskService = {
  taskBaseUrl: `${apiUrl}/task`,
  getToken() {
    return authService.getLoggerUser()
      ? authService.getLoggerUser().token
      : null;
  },
  async getTasks() {
    const token = this.getToken();
    const response = await axios.get(`${this.taskBaseUrl}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  },

  async addTask(data: TAddTask) {
    const token = this.getToken();
    const response = await axios.post(`${this.taskBaseUrl}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  },

  async finishTask(taskId: string) {
    const token = this.getToken();
    await axios.put(
      `${apiUrl}/${this.taskBaseUrl}/${taskId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },
};
