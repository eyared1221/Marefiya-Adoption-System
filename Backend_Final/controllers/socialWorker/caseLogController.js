import asyncHandler from 'express-async-handler';
import caseLog from '../../models/caseLogModel.js';
  
export const createCaseLog = asyncHandler(async (req, res) => {
    try {
      const newCaseLog = await caseLog.create(req.body);
      res.status(200).json({
        status: 'success',
        message: 'Case Log Created Successfully',
        data: {
          caseLog: newCaseLog,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to create Case Log.',
        error: error.message,
      });
    }
  });

export const getSingleCaseLog = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const caseLogData = await caseLog.findById(id);

  if (!caseLogData) {
    return res.status(404).json({
      status: 'error',
      message: 'Case Log not found',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      caseLog: caseLogData,
    },
  });
});

export const getCaseLog = asyncHandler(async (req, res) => {
  try {
    const caseLogs = await caseLog.find();

    res.status(200).json({
      status: 'success',
      data: {
        caseLogs,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch Case Log.',
      error: error.message,
    });
  }
});

export const updateCaseLog = asyncHandler(async (req, res) => {
  try {
      const { id } = req.params; 
      const updateCaseLog = await caseLog.findByIdAndUpdate(id, req.body, {
      new: true, 
      runValidators: true, 
  });

  if (!updateCaseLog) {
  return res.status(404).json({
      status: 'error',
      message: 'Case Log not found',
  });
  }

  res.status(200).json({
  status: 'success',
  message: 'Case Log Updated Successfully',
  data: {
      caseLog: updateCaseLog,
  },
  });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to update Case Log.',
      error: error.message,
    });
  }
});

export const deleteCaseLog = asyncHandler(async (req, res) => {
  const { id } = req.params;

  res.status(200).json({
    status: 'confirm',
    message: 'Are you sure you want to delete this data?',
  });

  if (req.body.confirmDelete) {
    const deleteCaseLog = await Case.findByIdAndDelete(id);

    if (!deleteCaseLog) {
      return res.status(404).json({
        status: 'error',
        message: 'Case Log not found',
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Case Log Deleted Successfully',
    });
  }
});

  
  
  
