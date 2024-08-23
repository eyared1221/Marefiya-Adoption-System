import express from "express";
import { 
   createStaff,
   getStaff, 
   getSocialWorker,
   getSocialWorkerId,
   getSingleStaff,
   updateStaff,
   login,
   getStaffId,
   getStaffCount
}  from '../../controllers/systemAdmin/staffController.js';

const router = express.Router();

router
   .route('/Create_Staff') 
   .post(createStaff)
// .get(getStaff)
router
    .route('/login')    
    .post(login)
    
router
    .route('/getStaff')
    .get(getStaff)

router
    .route('/getSocialWorker')
    .get(getSocialWorker)

router
    .route('/getSocialWorkerId')
    .get(getSocialWorkerId)

router
    .route('/workingStaff')
    .get(getStaffCount)
     
 
router
    .route('/:id')
    .get(getSingleStaff)
    .put(updateStaff);

router
    .route('/getStaffId/:staffId')
    .get(getStaffId)
;

    


export default router;