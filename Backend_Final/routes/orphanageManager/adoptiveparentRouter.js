import express from "express";
import { 
    createAdoptiveParent,
    getSingleAdoptiveParent, 
    updateAdoptiveParent, 
    deleteAdoptiveParent,
    getAdoptiveParent,
}  from '../../controllers/orphanageManager/adoptiveParentProfileController.js';

const router = express.Router();

router
    .route('/Create_Parent')
    .post(createAdoptiveParent)

router
    .route('/getAdoptiveParent')
    .get(getAdoptiveParent)

router
    .route('/:id')
    .get(getSingleAdoptiveParent)
    .put(updateAdoptiveParent)
    .delete(deleteAdoptiveParent);

export default router;