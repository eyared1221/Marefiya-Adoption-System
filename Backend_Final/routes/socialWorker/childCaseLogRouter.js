

import express from "express";
import { 
    createChildCaseLog,
    getChildCaseLog,
    updateChildCaseLog,
    deleteChildCaseLog
}  from '../../controllers/socialWorker/childCaseLogController.js';

const router = express.Router();

router
    .route('/Create_ChildCaseLog')
    .post(createChildCaseLog)

router
    .route('/getChildCaseLog')
    .get(getChildCaseLog)

router
    .route('/Update_ChildCaseLog/:caseId')
    .put(updateChildCaseLog)

router
    .route('/Delete_ChildCaseLog/:caseId')
    .delete(deleteChildCaseLog);

export default router;