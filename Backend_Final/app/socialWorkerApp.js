import express from 'express';
import bodyParser from 'body-parser';
import appointmentRouter from '../routes/socialWorker/appointmentRouter.js'; 
import childCaseLogRouter from '../routes/socialWorker/childCaseLogRouter.js'; 
import adoptiveParentCaseLogRouter from '../routes/socialWorker/adoptiveParentCaseLogRouter.js'; 
import cors from "cors";



const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(cors({ origin: 'http://localhost:5173' }));
app.use('/marefiya/api/socialWorker', appointmentRouter); 
app.use('/marefiya/api/socialWorker', adoptiveParentCaseLogRouter); 
app.use('/marefiya/api/socialWorker', childCaseLogRouter); 

export default app;




