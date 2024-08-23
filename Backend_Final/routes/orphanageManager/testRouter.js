import express from "express";
import { 
    createTest,
    
}  from '../../controllers/orphanageManager/testController.js';

const router = express.Router();

router
    .route('/')
    .post(createTest)

router 
    .route('/:id')
    
    
export default router;