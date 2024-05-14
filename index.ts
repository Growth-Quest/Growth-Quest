import express from 'express';
import { router } from './routes/routes';
import cors from 'cors';

const app = express();

const port = Number(process.env.PORT);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/', router);

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:3000`);
});
