const express = require('express');
const app = express();

// Arreglos para almacenar tareas y metas
let tasks = [];
let goals = [];

// Middleware para verificar la apikey
const apiKey = 'erejXrUgnPsiXeLro3HLHzQkQW63Ehs5';
app.use((req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader === apiKey) {
    next();
  } else {
    res.status(401).json({ error: 'Acceso no autorizado' });
  }
});

// Endpoints
app.get('/getTasks', (req, res) => {
  res.json(tasks);
});

app.get('/getGoals', (req, res) => {
  res.json(goals);
});

app.post('/addTask', (req, res) => {
  const task = req.body;
  tasks.push(task);
  res.json({ message: 'Tarea agregada correctamente' });
});

app.post('/addGoal', (req, res) => {
  const goal = req.body;
  goals.push(goal);
  res.json({ message: 'Meta agregada correctamente' });
});

app.delete('/removeTask', (req, res) => {
  const taskIndex = req.body.index;
  tasks.splice(taskIndex, 1);
  res.json({ message: 'Tarea eliminada correctamente' });
});

app.delete('/removeGoal', (req, res) => {
  const goalIndex = req.body.index;
  goals.splice(goalIndex, 1);
  res.json({ message: 'Meta eliminada correctamente' });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});