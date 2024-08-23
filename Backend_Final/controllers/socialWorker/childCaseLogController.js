import asyncHandler from 'express-async-handler';
import childCaseLog from '../../models/childCaseLogModel.js';

export const createChildCaseLog = asyncHandler(async (req, res) => {
    try {

      const newChildCaseLog = await childCaseLog.create(req.body);
      res.status(200).json({
        status: 'success',
        message: 'Child CaseLog Created Successfully',
        data: {
          childCaseLog: newChildCaseLog,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to create ChildCaseLog.',
        error: error.message,
      });
    }
  });

export const getChildCaseLog = asyncHandler(async (req, res) => {
    try {
      const childCaseLogs = await childCaseLog.find().select('childCaseLogId caseId cCaseLogDoc cDate cStatus');
  
      const newChildCaseLog = childCaseLogs.map((childCaseLog) => ({
        childCaseLogId: childCaseLog.childCaseLogId,
        caseId: childCaseLog.caseId,
        cCaseLogDoc: childCaseLog.cCaseLogDoc,
        cDate: childCaseLog.cDate,
        cStatus: childCaseLog.cStatus
      }));
      res.status(200).json({
        status: 'success',
        message: 'ChildCaseLog fetched Successfully',
        data: {
          childCaseLog: newChildCaseLog,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to Fetch ChildCaseLog.',
        error: error.message,
      });
    }
  });


export const updateChildCaseLog = async (req, res) => {
  try {
    const { childCaseLogId } = req.params.id;
    // const updatedChildCaseLogData = req.body;

    // Find the ChildCaseLog by the provided ChildCaseLogId
    const ChildCaseLogs = await childCaseLog.findOneAndReplace({_id: childCaseLogId}, req.body, {new:true});

    if (!ChildCaseLogs) {
      return res.status(404).json({ message: 'ChildCaseLog not found' });
    }

    // Update the ChildCaseLog with the new data
    // ChildCaseLogs.set(updatedChildCaseLogData);
    await ChildCaseLogs.save();

    res.status(200).json(ChildCaseLogs);
  } catch (error) {
    console.error('Error updating ChildCaseLog:', error);
    res.status(500).json({ message: 'Error updating ChildCaseLog' });
  }
};

export const deleteChildCaseLog = asyncHandler(async (req, res) => {
    try {
      const { childCaseLogId } = req.params;
  
      const result = await childCaseLog.deleteOne({ childCaseLogId: childCaseLogId });
  
      if (result.deletedCount === 0) {
        return res.status(404).json({
          status: 'error',
          message: 'ChildCaseLog not found'
        });
      }
  
      res.status(200).json({
        status: 'success',
        message: 'ChildCaseLog deleted successfully',
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
