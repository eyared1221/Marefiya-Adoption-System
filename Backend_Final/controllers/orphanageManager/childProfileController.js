import asyncHandler from 'express-async-handler';
import childProfile from '../../models/childProfileModel.js';
 
export const createChildProfile = asyncHandler(async (req, res) => {
  try {
    console.log("Create Child")
    const newChildProfile = await childProfile.create(req.body);
    res.status(200).json({
      status: 'success',
      message: 'Child Profile Created Successfully',
      data: {
        childProfile: newChildProfile,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to create Child Profile.',
      error: error.message,
    });
  }
});

// export const getSingleChildProfile = asyncHandler(async (req, res) => {
//   const { id } = req.params;

//   const childProfileData = await childProfile.findById(id);

//   if (!childProfileData) {
//     return res.status(404).json({
//       status: 'error',
//       message: 'Child Profile not found',
//     });
//   }

//   res.status(200).json({
//     status: 'success',
//     data: {
//       childProfile: childProfileData,
//     },
//   });
// });
export const getChildProfile = asyncHandler(async (req, res) => {
  try {
    const childProfiles = await childProfile.find().select('childId firstName middleName lastName gender childDOB language admission remark');


    const childProfilesWithFullName = childProfiles.map((childProfile) => ({
      childId: childProfile.childId,
      fullName: `${childProfile.firstName ? childProfile.firstName : ''} ${childProfile.middleName ? childProfile.middleName : ''} ${childProfile.lastName ? childProfile.lastName : ''}`.trim(),
      gender: childProfile.gender,
      childDOB: childProfile.childDoB,
      language: childProfile.language,
      remark: childProfile.remark
    }));

    res.status(200).json({
      status: 'success',
      message: 'Child fetched Successfully',
      data: {
        childProfile: childProfilesWithFullName,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to Fetch Child.',
      error: error.message,
    });
  }
});

export const updateChildProfile = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params; 
        const updatedChildProfile = await childProfile.findByIdAndUpdate(id, req.body, {
        new: true, 
        runValidators: true, 
    });
  
    if (!updatedChildProfile) {
    return res.status(404).json({
        status: 'error',
        message: 'Child Profile not found',
    });
    }

    res.status(200).json({
    status: 'success',
    message: 'Child Profile Updated Successfully',
    data: {
        childProfile: updatedChildProfile,
    },
    });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to update child profile.',
        error: error.message,
      });
    }
  });

