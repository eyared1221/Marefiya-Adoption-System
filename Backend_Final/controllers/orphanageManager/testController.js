import asyncHandler from 'express-async-handler';
import Test from '../../models/testModel.js';

 
// ====== CREATE JOB without validation====== 
export const createTest = asyncHandler(async (req, res, next) => { 
    const { name, date_of_birth, gender} = req.body; 
    if (!name || !date_of_birth || !gender ) { 
      next("Please Provide All Fields"); 
    } 
   // req.body.createdBy = req.user.userId; 
    const staff = await Test.create(req.body); 
    res.status(201).json({ staff }); 
  });
