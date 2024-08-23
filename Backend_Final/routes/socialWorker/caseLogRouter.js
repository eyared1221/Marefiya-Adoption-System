import express from "express";
import { 
    createCaseLog,
    getCaseLog,
    getSingleCaseLog,
    updateCaseLog,
    deleteCaseLog
}  from '../../controllers/socialWorker/caseLogController.js';

const router = express.Router();

router
    .route('/')
    .post(createCaseLog)
    .get(getCaseLog)

router
    .route('/:id')
    .get(getSingleCaseLog)
    .put(updateCaseLog)
    .delete(deleteCaseLog);

    
export default router;