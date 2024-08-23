import express from "express";
import { 
    createCase,
    getCase,
    getSingleCase,
    // updateCase,
    deleteCase,
    editCase,
    updateCase,
    getStaffIdByEmail
}  from '../../controllers/orphanageManager/caseController.js';

const router = express.Router();

router
    .route('/getCase')
    .get(getCase)

router
    .route('/Create_case')
    .post(createCase)

router
    .route('/Delete_case/:caseId')
    .delete(deleteCase)

router
    .route('/Edit_case/:caseId')
    .put(editCase)

router
    .route('/Update_case/:caseId')
    .patch(updateCase)

router
    .route('/getStaffIdByEmail')
    .get(getStaffIdByEmail)



// router
//     // .route('/:id')
//     // .get(getSingleCase)
//     .put(updateCase)
//     .delete(deleteCase);

export default router;