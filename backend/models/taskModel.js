// models/taskModel.js
const db = require('../config/conn');

class Task {
  static create(taskData, callback) {
    const { title, description, due_date, priority } = taskData;
    const query = `
      INSERT INTO tasks (title, description, due_date, priority) 
      VALUES (?, ?, ?, ?)
    `;
    
    db.query(query, [title, description, due_date, priority], callback);
  }

  static findAll(callback) {
    const query = 'SELECT * FROM tasks ORDER BY created_at DESC';
    db.query(query, callback);
  }

  static findById(id, callback) {
    const query = 'SELECT * FROM tasks WHERE id = ?';
    db.query(query, [id], callback);
  }

  static update(id, taskData, callback) {
    const { title, description, completed, due_date, priority } = taskData;
    const query = `
      UPDATE tasks 
      SET title = ?, description = ?, completed = ?, due_date = ?, priority = ? 
      WHERE id = ?
    `;
    
    db.query(query, [title, description, completed, due_date, priority, id], callback);
  }

  static delete(id, callback) {
    const query = 'DELETE FROM tasks WHERE id = ?';
    db.query(query, [id], callback);
  }

  static toggleComplete(id, completed, callback) {
    const query = 'UPDATE tasks SET completed = ? WHERE id = ?';
    db.query(query, [completed, id], callback);
  }
}

module.exports = Task;