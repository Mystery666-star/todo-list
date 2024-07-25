import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { WebSocketServer } from 'ws';

const app = express();
const PORT = process.env.PORT || 5000;
const WS_PORT = 5001;

// Configure CORS options
const corsOptions = {
  origin: 'http://localhost:3000', // Allow only this origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow these methods
  allowedHeaders: 'Content-Type', // Allow these headers
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));  // Enable CORS with options
app.use(bodyParser.json());

let tasks = [];
let users = [];

// WebSocket server setup
const wss = new WebSocketServer({ port: WS_PORT });

wss.on('connection', (ws) => {
  console.log('WebSocket connected');

  ws.on('message', (message) => {
    console.log('Received:', message);
  });

  ws.send('Hello, WebSocket Client!');
});

// API routes
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/api/tasks', (req, res) => {
  const newTask = req.body;
  newTask.id = tasks.length + 1;
  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.put('/api/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  const taskIndex = tasks.findIndex((task) => task.id === taskId);
  if (taskIndex !== -1) {
    tasks[taskIndex] = { ...tasks[taskIndex], ...req.body };
    res.json(tasks[taskIndex]);
  } else {
    res.status(404).json({ message: 'Task not found.' });
  }
});

app.delete('/api/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  tasks = tasks.filter((task) => task.id !== taskId);
  res.status(204).send();
});

app.post('/api/signup', (req, res) => {
  const { email, username, password } = req.body;
  if (!email || !username || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  const newUser = {
    id: users.length + 1,
    email,
    username,
    password,
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find((user) => user.email === email && user.password === password);
  if (user) {
    res.json(user);
  } else {
    res.status(401).json({ message: 'Invalid username or password' });
  }
});

app.listen(PORT, () => {
  console.log(`HTTP server is listening on port ${PORT}`);
});
