import asyncHandler from 'express-async-handler';
import staff from '../../models/staffModel.js';
import token from 'jsonwebtoken';


export const createStaff = asyncHandler(async (req, res) => {
    try {
    const newStaff = await staff.create(req.body);
    res.status(200).json({
      status: 'success',
      message: 'Staff Created Successfully',
      data: {
        staff: newStaff,
      },
    });
    
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to create Staff.',
        error: error.message,
      });
    }
  });

export const getSingleStaff = asyncHandler(async (req, res) => {
  const { staffId } = req.params;

  const staffData = await staff.findById(staffId);

  if (!staffData) {
    return res.status(404).json({
      status: 'error',
      message: 'Staff not found',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      staff: staffData,
    },
  });
});

export const getStaff = asyncHandler(async (req, res) => {
  try {
    const staffs = await staff.find().select('staffId firstName middleName lastName email gender role phoneNumber');


    const staffsWithFullName = staffs.map((staff) => ({
      staffId: staff.staffId,
      fullName: `${staff.firstName ? staff.firstName : ''} ${staff.middleName ? staff.middleName : ''} ${staff.lastName ? staff.lastName : ''}`.trim(),
      // firstName: staff.firstName,
      // middleName: staff.middleName,
      // lastName: staff.lastName,
      email: staff.email,
      gender: staff.gender,
      role: staff.role,
      phoneNumber: staff.phoneNumber,
      
    }));

    res.status(200).json({
      status: 'success',
      message: 'Staff fetched Successfully',
      data: {
        staff: staffsWithFullName,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to Staffs.',
      error: error.message,
    });
  }
});

export const getSocialWorker = asyncHandler(async (req, res) => {
  try {
    const staffs = await staff.find({ role: 'Social Worker' }).select('staffId firstName middleName lastName email gender role phoneNumber');


    const staffsWithFullName = staffs.map((staff) => ({
      staffId: staff.staffId,
      socialWokrerFullName: `${staff.firstName ? staff.firstName : ''} ${staff.middleName ? staff.middleName : ''} ${staff.lastName ? staff.lastName : ''}`.trim(),
      email: staff.email,
      gender: staff.gender,
      phoneNumber: staff.phoneNumber,
      
    }));

    res.status(200).json({
      status: 'success',
      message: 'Social Worker fetched Successfully',
      data: {
        staff: staffsWithFullName,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to Fetch social worker.',
      error: error.message,
    });
  }
});

export const getSocialWorkerId = asyncHandler(async (req, res) => {
  try {
    const staffs = await staff.find({ role: 'Social Worker' }).select('staffId');


    const staffsWithFullName = staffs.map((staff) => ({
      staffId: staff.staffId,
      
    }));

    res.status(200).json({
      status: 'success',
      message: 'Social Worker fetched Successfully',
      data: {
        staff: staffsWithFullName,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to Fetch social worker.',
      error: error.message,
    });
  }
});

export const updateStaff = asyncHandler(async (req, res) => {
  try {
      const { id } = req.params; 
      const updatedStaff = await staff.findByIdAndUpdate(id, req.body, {
      new: true, 
      runValidators: true, 
  });

  if (!updatedStaff) {
  return res.status(404).json({
      status: 'error',
      message: 'Staff not found',
  });
  }

  res.status(200).json({
  status: 'success',
  message: 'Staff Updated Successfully',
  data: {
      staff: updatedStaff,
  },
  });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to update Staff.',
      error: error.message,
    });
  }
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
 

  try {
    const user = await staff.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isPasswordValid = await user.comparePasswordInDb(password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // // Generate a JWT token (you'll need to implement this part)
    // const token = generateJWTToken(user);

    // Retrieve the user's data from the database
    const userData = await staff.findOne({ email }, { password: 0, __v: 0 });
    const { staffId, firstName,lastName, role, phoneNumber} = userData;

    res.status(200).json({ user: { staffId, role, firstName, lastName, phoneNumber, email} });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// function generateJWTToken(user) {
//   // Implement your JWT token generation logic here
//   // This is an example using the jsonwebtoken package
//   const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//   return token;
// }

export const getStaffId = async (email, password) => {
  try {
    // Call the login function
    const { user, error } = await login({ body: { email, password } });

    if (user) {
      // Extract the staffId from the user object
      return { staffId: user.staffId };
    } else {
      // Return the error message
      return { error: error || 'Login failed' };
    }
  } catch (err) {
    console.error('Error getting staff ID:', err);
    // Return a generic error message
    return { error: 'An error occurred while getting the staff ID.' };
  }
};

export const getStaffCount = asyncHandler(async (req, res) => {
  try {
    // Get the total count of staff
    const staffCount = await staff.countDocuments();

    res.status(200).json({
      status: 'success',
      message: 'Staff count fetched successfully',
      data: {
        staffCount,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch staff count.',
      error: error.message,
    });
  }
});


