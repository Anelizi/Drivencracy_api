import express from 'express';
import cors from 'cors';
import pollsRouter from './routes/polls.routes.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(pollsRouter);

const PORT = 5000
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`))