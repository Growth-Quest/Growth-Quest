import express from 'express';
import { router } from './routes/routes';
import cors from 'cors';
import { Server } from 'http';

export const app = express();

const port = Number(process.env.PORT);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/', router);

export const server: Server = app.listen(port, () => {
  console.log(`Server running on http://localhost:3000`);
});
