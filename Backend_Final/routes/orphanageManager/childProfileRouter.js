import express from "express";
import { 
    createChildProfile,
    getChildProfile,
    // getSingleChildProfile, 
    updateChildProfile, 
}  from '../../controllers/orphanageManager/childProfileController.js';

const router = express.Router();

router
    .route('/getChildProfile')
    .get(getChildProfile)

router
    .route('/Create_Child_Profile')
    .post(createChildProfile)

    
// router
//     .route('/:id')
//     .get(getSingleChildProfile)
//     .put(updateChildProfile)

export default router;