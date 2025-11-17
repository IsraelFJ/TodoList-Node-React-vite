// src/components/TaskList.jsx
import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onEdit, onDelete, onToggleComplete, loading }) => {
  if (loading) {
    return (
      <div className="task-list">
        <div className="loading">Carregando tarefas...</div>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="task-list">
        <div className="empty-state">
          <h3>Nenhuma tarefa encontrada</h3>
          <p>Comece adicionando sua primeira tarefa!</p>
        </div>
      </div>
    );
  }

  // Separar tarefas concluídas e pendentes
  const pendingTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div className="task-list">
      {pendingTasks.length > 0 && (
        <div className="task-section">
          <h3 className="section-title">
            Pendentes ({pendingTasks.length})
          </h3>
          {pendingTasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
              onToggleComplete={onToggleComplete}
            />
          ))}
        </div>
      )}

      {completedTasks.length > 0 && (
        <div className="task-section">
          <h3 className="section-title">
            Concluídas ({completedTasks.length})
          </h3>
          {completedTasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
              onToggleComplete={onToggleComplete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;