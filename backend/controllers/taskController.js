// controllers/taskController.js
const Task = require('../models/taskModel');

exports.createTask = (req, res) => {
  const { title, description, due_date, priority } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'Título é obrigatório' });
  }

  Task.create({ title, description, due_date, priority }, (err, results) => {
    if (err) {
      console.error('Erro ao criar tarefa:', err);
      return res.status(500).json({ error: 'Erro ao criar tarefa' });
    }
    res.status(201).json({
      id: results.insertId,
      title,
      description,
      due_date,
      priority,
      completed: false,
      message: 'Tarefa criada com sucesso!'
    });
  });
};

exports.getAllTasks = (req, res) => {
  Task.findAll((err, results) => {
    if (err) {
      console.error('Erro ao buscar tarefas:', err);
      return res.status(500).json({ error: 'Erro ao buscar tarefas' });
    }
    res.json(results);
  });
};

exports.getTaskById = (req, res) => {
  const { id } = req.params;

  Task.findById(id, (err, results) => {
    if (err) {
      console.error('Erro ao buscar tarefa:', err);
      return res.status(500).json({ error: 'Erro ao buscar tarefa' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }
    res.json(results[0]);
  });
};

exports.updateTask = (req, res) => {
  const { id } = req.params;
  const { title, description, completed, due_date, priority } = req.body;

  Task.update(id, { title, description, completed, due_date, priority }, (err, results) => {
    if (err) {
      console.error('Erro ao atualizar tarefa:', err);
      return res.status(500).json({ error: 'Erro ao atualizar tarefa' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }
    res.json({ message: 'Tarefa atualizada com sucesso!' });
  });
};

exports.deleteTask = (req, res) => {
  const { id } = req.params;

  Task.delete(id, (err, results) => {
    if (err) {
      console.error('Erro ao deletar tarefa:', err);
      return res.status(500).json({ error: 'Erro ao deletar tarefa' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }
    res.json({ message: 'Tarefa deletada com sucesso!' });
  });
};

exports.toggleComplete = (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  Task.toggleComplete(id, completed, (err, results) => {
    if (err) {
      console.error('Erro ao atualizar tarefa:', err);
      return res.status(500).json({ error: 'Erro ao atualizar tarefa' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }
    res.json({ message: `Tarefa ${completed ? 'concluída' : 'pendente'}!` });
  });
};