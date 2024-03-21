/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { StudentRoutes } from './modules/student/student.route';
import { UserRouter } from './modules/User/user.route';
import globalErrorHandler from './middleware/globalErrorHandler';
import notFound from './middleware/notFound';
import router from './router.ts';

const app: Application = express()

app.use(express.json());
app.use(cors());

app.use('/api/v1', router)

app.use(globalErrorHandler)

// not found 
app.use(notFound)

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
})

export default app