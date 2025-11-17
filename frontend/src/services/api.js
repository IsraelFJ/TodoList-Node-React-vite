// src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para logging (opcional)
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to: ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const taskService = {
  // Buscar todas as tarefas
  getAllTasks: async () => {
    try {
      const response = await api.get('/tasks');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
      throw error;
    }
  },

  // Buscar tarefa por ID
  getTaskById: async (id) => {
    try {
      const response = await api.get(`/tasks/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar tarefa ${id}:`, error);
      throw error;
    }
  },

  // Criar nova tarefa
  createTask: async (taskData) => {
    try {
      const response = await api.post('/tasks', taskData);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
      throw error;
    }
  },

  // Atualizar tarefa
  updateTask: async (id, taskData) => {
    try {
      const response = await api.put(`/tasks/${id}`, taskData);
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar tarefa ${id}:`, error);
      throw error;
    }
  },

  // Deletar tarefa
  deleteTask: async (id) => {
    try {
      const response = await api.delete(`/tasks/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao deletar tarefa ${id}:`, error);
      throw error;
    }
  },

  // Alternar status de conclusão
  toggleComplete: async (id, completed) => {
    try {
      const response = await api.patch(`/tasks/${id}/complete`, { completed });
      return response.data;
    } catch (error) {
      console.error(`Erro ao alternar status da tarefa ${id}:`, error);
      throw error;
    }
  },
};

export default api;