import express from 'express';
import dotenv from 'dotenv';
// import usersRouter from '../src/routers/users.js';

import { connectPrisma } from './utils/prisma.util.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.set('port', PORT || 3000);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use('/', usersRouter);




app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal server error' });
});

app.get('/', (req, res) => {
    res.send('Hello world!!');
});

// The server will start only when connected to the Prisma.
connectPrisma()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`App is running at http://localhost:${PORT}`)
        });
    })
    .catch((error) => {
        console.error('Failed to connect to the database. Server not started.', error.message);
        process.exit(1);
    });
