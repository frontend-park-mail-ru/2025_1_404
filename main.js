'use strict';

import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const DEFAULT_PORT = 8000;
const SERVER_PORT = process.env.PORT || DEFAULT_PORT;

app.use('/scripts/serviceWorker.js', (req, res, next) => {
  res.setHeader('Service-Worker-Allowed', '/');
  next();
});

app.use(express.static(path.join(__dirname, 'public')));

// Отдаём index.html для всех маршрутов
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(SERVER_PORT, () => {
  console.log(`Server is running on http://localhost:${SERVER_PORT}`);
});
