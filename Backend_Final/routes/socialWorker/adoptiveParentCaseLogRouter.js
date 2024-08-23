
import express from "express";
import { 
    createAdoptiveParentCaseLog,
    getAdoptiveParentCaseLog,
    updateAdoptiveParentCaseLog,
    deleteAdoptiveParentCaseLog
}  from '../../controllers/socialWorker/adoptiveParentCaseLogController.js';

const router = express.Router();

router
    .route('/Create_AdoptiveParentCaseLog')
    .post(createAdoptiveParentCaseLog)

router
    .route('/getAdoptiveParentCaseLog')
    .get(getAdoptiveParentCaseLog)

router
    .route('/Update_AdoptiveParentCaseLog/:caseId')
    .put(updateAdoptiveParentCaseLog)

router
    .route('/Delete_AdoptiveParentCaseLog/:caseId')
    .delete(deleteAdoptiveParentCaseLog);

export default router;