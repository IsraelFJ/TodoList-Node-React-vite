// src/components/TaskItem.jsx
import React from 'react';
import { Edit, Trash2, Check, Clock } from 'lucide-react';

const TaskItem = ({ task, onEdit, onDelete, onToggleComplete }) => {
  const handleToggleComplete = async () => {
    try {
      await onToggleComplete(task.id, !task.completed);
    } catch (error) {
      console.error('Erro ao alternar status:', error);
    }
  };

  const handleEdit = () => {
    onEdit(task);
  };

  const handleDelete = async () => {
    if (window.confirm('Tem certeza que deseja excluir esta tarefa?')) {
      try {
        await onDelete(task.id);
      } catch (error) {
        console.error('Erro ao excluir tarefa:', error);
      }
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return 'priority-medium';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Sem data';
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const isOverdue = task.due_date && new Date(task.due_date) < new Date() && !task.completed;

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''} ${isOverdue ? 'overdue' : ''}`}>
      <div className="task-main">
        <button
          onClick={handleToggleComplete}
          className={`task-checkbox ${task.completed ? 'checked' : ''}`}
          title={task.completed ? 'Marcar como pendente' : 'Marcar como concluída'}
        >
          {task.completed && <Check size={14} />}
        </button>

        <div className="task-content">
          <h3 className="task-title">{task.title}</h3>
          {task.description && (
            <p className="task-description">{task.description}</p>
          )}
          
          <div className="task-meta">
            <span className={`task-priority ${getPriorityColor(task.priority)}`}>
              {task.priority === 'high' ? 'Alta' : 
               task.priority === 'medium' ? 'Média' : 'Baixa'}
            </span>
            
            <span className={`task-due-date ${isOverdue ? 'overdue' : ''}`}>
              <Clock size={12} />
              {formatDate(task.due_date)}
            </span>
            
            <span className="task-created">
              Criada em: {new Date(task.created_at).toLocaleDateString('pt-BR')}
            </span>
          </div>
        </div>
      </div>

      <div className="task-actions">
        <button
          onClick={handleEdit}
          className="btn-icon"
          title="Editar tarefa"
        >
          <Edit size={16} />
        </button>
        
        <button
          onClick={handleDelete}
          className="btn-icon btn-danger"
          title="Excluir tarefa"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;