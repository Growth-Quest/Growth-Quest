import express from 'express';
import { router } from './routes/routes';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/', router);


app.listen(3000, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:3000`);
});

// app.listen(3000, 0.0.0.0, () => {
//   console.log('server is running at http://localhost:3000');
// });