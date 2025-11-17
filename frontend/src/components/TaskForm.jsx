// src/components/TaskForm.jsx
import React, { useState } from 'react';
import { Plus } from 'lucide-react';

const TaskForm = ({ onTaskAdded, editingTask, onCancelEdit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    due_date: '',
    priority: 'medium'
  });
  const [loading, setLoading] = useState(false);

  // Preencher formulário se estiver editando
  React.useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title || '',
        description: editingTask.description || '',
        due_date: editingTask.due_date || '',
        priority: editingTask.priority || 'medium'
      });
    } else {
      setFormData({
        title: '',
        description: '',
        due_date: '',
        priority: 'medium'
      });
    }
  }, [editingTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      alert('O título da tarefa é obrigatório!');
      return;
    }

    setLoading(true);
    try {
      if (editingTask) {
        await onTaskAdded(formData, editingTask.id);
      } else {
        await onTaskAdded(formData);
      }
      
      // Limpar formulário após sucesso
      if (!editingTask) {
        setFormData({
          title: '',
          description: '',
          due_date: '',
          priority: 'medium'
        });
      }
    } catch (error) {
      console.error('Erro ao salvar tarefa:', error);
      alert('Erro ao salvar tarefa. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="task-form-container">
      <h2 className="form-title">
        {editingTask ? 'Editar Tarefa' : 'Nova Tarefa'}
      </h2>
      
      <form onSubmit={handleSubmit} className="task-form">
        <div className="form-group">
          <label htmlFor="title" className="form-label">
            Título *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="form-input"
            placeholder="Digite o título da tarefa"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description" className="form-label">
            Descrição
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="form-textarea"
            placeholder="Digite a descrição da tarefa (opcional)"
            rows="3"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="due_date" className="form-label">
              Data de Vencimento
            </label>
            <input
              type="date"
              id="due_date"
              name="due_date"
              value={formData.due_date}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="priority" className="form-label">
              Prioridade
            </label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="form-select"
            >
              <option value="low">Baixa</option>
              <option value="medium">Média</option>
              <option value="high">Alta</option>
            </select>
          </div>
        </div>

        <div className="form-actions">
          {editingTask && (
            <button
              type="button"
              onClick={onCancelEdit}
              className="btn btn-secondary"
              disabled={loading}
            >
              Cancelar
            </button>
          )}
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading || !formData.title.trim()}
          >
            {loading ? (
              'Salvando...'
            ) : (
              <>
                <Plus size={16} />
                {editingTask ? 'Atualizar Tarefa' : 'Adicionar Tarefa'}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;