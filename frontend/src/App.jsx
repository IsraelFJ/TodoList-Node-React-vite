// src/App.jsx
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { taskService } from './services/api';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTask, setEditingTask] = useState(null);

  // Carregar tarefas
  const loadTasks = async () => {
    try {
      setLoading(true);
      const tasksData = await taskService.getAllTasks();
      setTasks(tasksData);
    } catch (error) {
      console.error('Erro ao carregar tarefas:', error);
      alert('Erro ao carregar tarefas. Verifique se o backend está rodando.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  // Adicionar/Editar tarefa
  const handleTaskAdded = async (taskData, taskId = null) => {
    try {
      if (taskId) {
        // Editar tarefa existente
        await taskService.updateTask(taskId, taskData);
      } else {
        // Criar nova tarefa
        await taskService.createTask(taskData);
      }
      
      await loadTasks(); // Recarregar a lista
      setEditingTask(null); // Sair do modo edição
    } catch (error) {
      console.error('Erro ao salvar tarefa:', error);
      throw error;
    }
  };

  // Excluir tarefa
  const handleDeleteTask = async (taskId) => {
    try {
      await taskService.deleteTask(taskId);
      await loadTasks(); // Recarregar a lista
    } catch (error) {
      console.error('Erro ao excluir tarefa:', error);
      throw error;
    }
  };

  // Alternar status de conclusão
  const handleToggleComplete = async (taskId, completed) => {
    try {
      await taskService.toggleComplete(taskId, completed);
      await loadTasks(); // Recarregar a lista
    } catch (error) {
      console.error('Erro ao alternar status:', error);
      throw error;
    }
  };

  // Editar tarefa
  const handleEditTask = (task) => {
    setEditingTask(task);
  };

  // Cancelar edição
  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  return (
    <div className="app">
      <Header />
      
      <main className="main-content">
        <div className="container">
          <div className="app-layout">
            {/* Sidebar com formulário */}
            <aside className="sidebar">
              <TaskForm
                onTaskAdded={handleTaskAdded}
                editingTask={editingTask}
                onCancelEdit={handleCancelEdit}
              />
            </aside>

            {/* Lista de tarefas */}
            <section className="content">
              <div className="content-header">
                <h2>Minhas Tarefas</h2>
                <button
                  onClick={loadTasks}
                  className="btn btn-secondary"
                  disabled={loading}
                >
                  {loading ? 'Atualizando...' : 'Atualizar'}
                </button>
              </div>

              <TaskList
                tasks={tasks}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
                onToggleComplete={handleToggleComplete}
                loading={loading}
              />
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;