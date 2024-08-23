import asyncHandler from 'express-async-handler';
import adoptiveParent from '../../models/adoptiveParentModel.js';
  
export const createAdoptiveParent = asyncHandler(async (req, res) => {
    try {
      const newAdoptiveParent = await adoptiveParent.create(req.body);
      res.status(200).json({
        status: 'success',
        message: 'Adoptive Parent Created Successfully',
        data: {
          adoptiveParent: newAdoptiveParent,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to create Adopive Parent.',
        error: error.message,
      });
    }
  });

export const getSingleAdoptiveParent = asyncHandler(async (req, res) => {
  const { adoptiveParentId } = req.params;

  const adopiveParentData = await adoptiveParent.findById(adoptiveParentId);

  if (!adopiveParentData) {
    return res.status(404).json({
      status: 'error',
      message: 'Parent not found',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      adoptiveParent: adopiveParentData,
    },
  });
});


export const getAdoptiveParent = asyncHandler(async (req, res) => {
  try {
    const adoptiveParents = await adoptiveParent.find().select('adoptiveParentId f_firstName f_middleName m_firstName m_middleName f_email f_phoneNumber m_phoneNumber');


    const adoptiveParentsWithFullName = adoptiveParents.map((adoptiveParent) => ({
      adoptiveParentId: adoptiveParent.adoptiveParentId,
      fosterFather: `${adoptiveParent.f_firstName ? adoptiveParent.f_firstName : ''} ${adoptiveParent.f_middleName ? adoptiveParent.f_middleName : ''}`.trim(),
      fosterMother: `${adoptiveParent.m_firstName ? adoptiveParent.m_firstName : ''} ${adoptiveParent.m_middleName ? adoptiveParent.m_middleName : ''}`.trim(),
      email: adoptiveParent.f_email,
      fatherPhoneNumber: adoptiveParent.f_phoneNumber,
      motherPhoneNumber: adoptiveParent.m_phoneNumber,
    }));

    res.status(200).json({
      status: 'success',
      message: 'Adoptive Parent fetched Successfully',
      data: {
        adoptiveParent: adoptiveParentsWithFullName,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to Fetch Adoptive Parent.',
      error: error.message,
    });
  }
});

export const updateAdoptiveParent = asyncHandler(async (req, res) => {
  try {
      const { adoptiveParentId } = req.params; 
      const updateAdoptiveParent = await adoptiveParent.findByIdAndUpdate(adoptiveParentId, req.body, {
      new: true, 
      runValidators: true, 
  });

  if (!updateAdoptiveParent) {
  return res.status(404).json({
      status: 'error',
      message: 'Parent not found',
  });
  }

  res.status(200).json({
  status: 'success',
  message: 'Parent profile Updated Successfully',
  data: {
      adoptiveParent: updateAdoptiveParent,
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

export const deleteAdoptiveParent = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Send confirmation message to client
  res.status(200).json({
    status: 'confirm',
    message: 'Are you sure you want to delete this parent profile?',
  });

  // Client confirms the deletion
  if (req.body.confirmDelete) {
    const deleteAdoptiveParent = await adoptiveParent.findByIdAndDelete(id);

    if (!deleteAdoptiveParent) {
      return res.status(404).json({
        status: 'error',
        message: 'Parent profile not found',
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Parent Deleted Successfully',
    });
  }
});


