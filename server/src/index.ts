import express, { Request, Response } from 'express';
import { config } from './config/index';
import { connectDB } from './config/db';
import cors from 'cors';
import cookieParser from 'cookie-parser'; 

import auth from './routes/index';
import org from './routes/organization.route';

const app = express();
const PORT = config.port;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());  

app.use(cors({
    origin: 'http://localhost:3000',  
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.get('/', (_req: Request, res: Response) => {
    res.send('Hello, World!');
});

app.use('/api', auth);
app.use('/api', org);

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Failed to connect to the database', error);
        process.exit(1);
    }
};

startServer();
