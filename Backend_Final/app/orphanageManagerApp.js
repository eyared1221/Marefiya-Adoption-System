import express from 'express';
import bodyParser from 'body-parser';
import childProfileRouter from '../routes/orphanageManager/childProfileRouter.js'; 
import adoptiveParentRouter from '../routes/orphanageManager/adoptiveparentRouter.js';
import caseRouter from '../routes/orphanageManager/caseRouter.js'; 
import cors from "cors";



const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(cors({ origin: 'http://localhost:5173' }));
app.use('/marefiya/api/orphanageManager', childProfileRouter);
app.use('/marefiya/api/orphanageManager', caseRouter);
app.use('/marefiya/api/orphanageManager', adoptiveParentRouter);


export default app;
