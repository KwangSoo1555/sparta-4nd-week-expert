import express from 'express';
import dotenv from 'dotenv';

import { connectPrisma } from './utils/prisma.util.js';
import { router as usersRouter } from '../src/routers/users.router.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.set('port', PORT || 3100);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', usersRouter);

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

app.get('/', (req, res) => {
  res.send('Hello world!!');
});

connectPrisma();

app.listen(PORT, () => {
  console.log(`App is running at http://localhost:${PORT}`);
});
