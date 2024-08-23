import express from 'express';
import bodyParser from 'body-parser';
import staffRouter from '../routes/systemAdmin/staffRouter.js';
import cors from 'cors'; 

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(cors({ origin: 'http://localhost:5173' }));
app.use('/marefiya/api/systemAdmin', staffRouter);

export default app;
