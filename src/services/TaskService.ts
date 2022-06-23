import axios from "axios";
import { config } from "process";
import { authService } from "./AuthService";

const apiUrl = "http://localhost:3001";

interface TAddTask {
  title: string;
  description: string;
  expiresAt: string;
}

const { token } = authService.getLoggerUser();

export const taskService = {
  async getTasks() {
    const response = await axios.get(`${apiUrl}/tasks`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  },

  async addTask(data: TAddTask) {
    const response = await axios.post(`${apiUrl}/tasks`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  },

  async finishTask(taskId: string) {
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
