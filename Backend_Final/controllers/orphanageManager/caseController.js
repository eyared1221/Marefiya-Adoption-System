import asyncHandler from 'express-async-handler';
import Case from '../../models/CaseModel.js';
import staff from '../../models/staffModel.js'
import mongoose from 'mongoose';

  
export const createCase = asyncHandler(async (req, res) => {
    try {
      const newCase = await Case.create(req.body);
      res.status(200).json({
        status: 'success',
        message: 'Case Created Successfully',
        data: {
          Case: newCase,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to create Case.',
        error: error.message,
      });
    }
  });

export const getCase = asyncHandler(async (req, res) => {
  try {
    const cases = await Case.find().select('caseId staffId childId adoptiveParentId newCaseName newAssignedDate newAssignedBy');

    const casesWithFullName = cases.map((Case) => ({
      caseId: Case.caseId,
      staffId: Case.staffId,
      adoptiveParentId: Case.adoptiveParentId,
      childId: Case.childId,
      newCaseName: Case.newCaseName,
      newAssignedDate: Case.newAssignedDate,
      newAssignedBy: Case.newAssignedBy
    }));
    res.status(200).json({
      status: 'success',
      message: 'Case fetched Successfully',
      data: {
        Case: casesWithFullName,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to Fetch case.',
      error: error.message,
    });
  }
});

export const getSingleCase = asyncHandler(async (req, res) => {
  const { caseId } = req.params;

  const caseData = await Case.findById(staffId);

  if (!caseData) {
    return res.status(404).json({
      status: 'error',
      message: 'Case not found',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      Case: caseData,
    },
  });
});

// export const editCase = asyncHandler(async (req, res) => {
//   try {
//     const caseId = req.params;
//     console.log(caseId)
//     const caseData = await Case.findOneAndReplace({ caseId: caseData.caseId }, req.body,{new: true});


//     res.status(200).json({
//        caseData
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       status: 'error',
//       message: 'Failed to fetch case.',
//       error: error.message,
//     });
//   }
// });
export const updateCase = asyncHandler(async (req, res) => {
  try {
    const { caseId } = req.params;
    console.log(caseId);

    // Find the existing case data
    const existingCase = await Case.findOne({ caseId });

    // Replace the existing case data with the new data
    const updatedCase = await Case.findOneAndReplace(
      { caseId },
      { ...existingCase.toObject(), ...req.body },
      { new: true }
    );

    res.status(200).json({
      caseData: updatedCase,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to update case.',
      error: error.message,
    });
  }
});
// editCase controller

export const editCase = asyncHandler(async (req, res) => {
  try {
    const { caseId } = req.params;
    const existingCase = await Case.findOne({ caseId });

    if (!existingCase) {
      return res.status(404).json({
        status: 'error',
        message: 'Case not found',
      });
    }

    res.status(200).json({
      data: {
        Case: existingCase,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch case data.',
      error: error.message,
    });
  }
});


export const deleteCase = asyncHandler(async (req, res) => {
  try {
    const { caseId } = req.params;

    // Find the case by caseId and delete it
    const result = await Case.deleteOne({ caseId: caseId });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Case not found'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Case deleted successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to delete the case.',
      error: error.message,
    });
  }
});


export const getStaffIdByEmail = asyncHandler(async (req, res) => {
  try {
    const { email } = req.body;

    // Fetch the staff data from your database or data source
    const staffData = await staff.findOne({ email }); // Assuming you have a 'Staff' model

    if (!staffData) {
      return res.status(404).json({ error: 'Staff not found' });
    }

    // Extract the staffId from the staff data
    const { staffId: staffId } = staffData;

    res.json({ data: { staffId } });
  } catch (error) {
    console.error('Error fetching staffId:', error);
    res.status(500).json({ error: 'Error fetching staffId' });
  }
});