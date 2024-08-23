import asyncHandler from 'express-async-handler';
import adoptiveParentCaseLog from '../../models/adoptiveParentCaseLogModel.js';
import fs from 'fs';

export const createAdoptiveParentCaseLog = asyncHandler(async (req, res) => {
  try {
    // Check if pCaseLogDoc is defined
    if (!req.body.pCaseLogDoc) {
      return res.status(400).json({
        status: 'error',
        message: 'pCaseLogDoc is required.',
      });
    }


    // Create the new adoptiveParentCaseLog with the file content
    const newAdoptiveParentCaseLog = await adoptiveParentCaseLog.create({
      caseId: req.body.caseId,
      pCaseLogDoc: req.body.pCaseLogDoc, // Store the file data as a base64-encoded string
      pStatus: req.body.pStatus,
      pFileName: req.body.pFileName,
    });

    res.status(200).json({
      status: 'success',
      message: 'AdoptiveParentCaseLog Created Successfully',
      data: {
        adoptiveParentCaseLog: newAdoptiveParentCaseLog,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to create adoptiveParentCaseLog.',
      error: error.message,
    });
  }
});

export const getAdoptiveParentCaseLog = asyncHandler(async (req, res) => {
  try {
    const AdoptiveParentCaseLogs = await adoptiveParentCaseLog.find().select('caseId parentCaseLogId pCaseLogDoc pDate pStatus');

    const newAdoptiveParentCaseLog = AdoptiveParentCaseLogs.map((adoptiveParentCaseLog) => ({

          caseId: adoptiveParentCaseLog.caseId,
          parentCaseLogId: adoptiveParentCaseLog.parentCaseLogId,
          pCaseLogDoc: adoptiveParentCaseLog.pCaseLogDoc,
          pDate: adoptiveParentCaseLog.pDate,
          pStatus: adoptiveParentCaseLog.pStatus,

      })
    );

    res.status(200).json({
      status: 'success',
      message: 'AdoptiveParentCaseLog fetched Successfully',
      data: {
        AdoptiveParentCaseLog: newAdoptiveParentCaseLog,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to Fetch adoptiveParentCaseLog.',
      error: error.message,
    });
  }
});



export const updateAdoptiveParentCaseLog = async (req, res) => {
  try {
    const { AdoptiveParentCaseLogId } = req.params.id;
    // const updatedAdoptiveParentCaseLogData = req.body;

    // Find the AdoptiveParentCaseLog by the provided AdoptiveParentCaseLogId
    const AdoptiveParentCaseLogs = await adoptiveParentCaseLog.findOneAndReplace({_id: AdoptiveParentCaseLogId}, req.body, {new:true});

    if (!AdoptiveParentCaseLogs) {
      return res.status(404).json({ message: 'AdoptiveParentCaseLog not found' });
    }

    // Update the AdoptiveParentCaseLog with the new data
    // AdoptiveParentCaseLogs.set(updatedAdoptiveParentCaseLogData);
    await AdoptiveParentCaseLogs.save();

    res.status(200).json(AdoptiveParentCaseLogs);
  } catch (error) {
    console.error('Error updating AdoptiveParentCaseLog:', error);
    res.status(500).json({ message: 'Error updating AdoptiveParentCaseLog' });
  }
};

export const deleteAdoptiveParentCaseLog = asyncHandler(async (req, res) => {
    try {
      const { AdoptiveParentCaseLogId } = req.params;
  
      const result = await adoptiveParentCaseLog.deleteOne({ AdoptiveParentCaseLogId: AdoptiveParentCaseLogId });
  
      if (result.deletedCount === 0) {
        return res.status(404).json({
          status: 'error',
          message: 'AdoptiveParentCaseLog not found'
        });
      }
  
      res.status(200).json({
        status: 'success',
        message: 'AdoptiveParentCaseLog deleted successfully',
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
