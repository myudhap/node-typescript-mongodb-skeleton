import express, { Express, NextFunction, Request, Response } from 'express'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import mongoose from 'mongoose'
import cors from 'cors'
import helmet from 'helmet'
import statusCode from 'http-status-codes'
import compression from 'compression'

import Router from './routes'

const app:Express = express();

// Express Basic Setting
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(compression());
// Logger
app.use(morgan('dev'));
// Helmet
app.use(helmet());
// Middleware for client
app.use(cors());

// Database Server
const uri: string = `${process.env.MONGODB_STRING_URI}`;
mongoose
    .connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('Success connected to Database');
    })
    .catch(err => {
        console.log('Failed connected to Database');
    })


// Main Route
app.use('/api', Router);
app.use('*', (req: Request, res: Response) => {
    res.send('API Skeleton')
});

// Error Handling
app.use((err:Error, req: Request, res: Response, next: NextFunction) => {
    return res.status(statusCode.BAD_REQUEST).json({
        error: err.message
    });
});

export default app;