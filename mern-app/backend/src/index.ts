import express, { NextFunction, Request, Response } from 'express';
import router from './routes/route';
import dotenv from 'dotenv';
import { connection } from './connection/conn';
import cors from 'cors';

dotenv.config();
connection();

const app = express();
const port = process.env.PORT || 3000;

// Use CORS middleware
const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// logger
app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(req.method, req.hostname, req.path, new Date(Date.now()).toString());
    next();
})

app.use(express.json());
app.use('/tasks', router);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript     Express!');
});

// Add this error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});