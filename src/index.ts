import express from 'express';
import dotenv  from 'dotenv';
import { apiRouter } from './api';

const app = express();
dotenv.config();

const port = process.env.PORT;

app.use(express.json());
app.use('/', apiRouter);
  
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });