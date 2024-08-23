import asyncHandler from 'express-async-handler';
import appointment from '../../models/appointmentModel.js';
import multer from 'multer';
import upload from '../../config/mulater.js';
import {v2 as cloudinary} from 'cloudinary';

export const createAppointment = asyncHandler(async (req, res) => {
  try {
    const newAppointment = await appointment.create(req.body);
    res.status(200).json({
      status: 'success',
      message: 'appointment Created Successfully',
      data: {
        appointment: newAppointment,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to create Appointment.',
      error: error.message,
    });
  }
});



// export const getAppointment = asyncHandler(async (req, res) => {
//     try {
//       const appointments = await appointment.find().select('appointmentId staffId appointmentTitle appointmentDescription appointmentDate');
  
//       const newAppointment = appointments.map((appointment) => ({
//         appointmentId: appointment.appointmentId,
//         staffId: appointment.staffId,
//         appointmentTitle: appointment.appointmentTitle,
//         appointmentDescription: appointment.appointmentDescription,
//         appointmentDate: appointment.appointmentDate
//       }));
//       res.status(200).json({
//         status: 'success',
//         message: 'Appointment fetched Successfully',
//         data: {
//           appointment: newAppointment,
//         },
//       });
//     } catch (error) {
//       console.log(error);
//       res.status(500).json({
//         status: 'error',
//         message: 'Failed to Fetch appointment.',
//         error: error.message,
//       });
//     }
//   });


export const getAppointment = asyncHandler(async (req, res) => {
  try {
    const appointments = await appointment.find().select('appointmentId staffId appointmentTitle appointmentDescription appointmentDate');
    
    const newAppointment = appointments.map((appointment) => ({
   
          appointmentId: appointment.appointmentId,
          staffId: appointment.staffId,
          appointmentTitle: appointment.appointmentTitle,
          appointmentDescription: appointment.appointmentDescription,
          appointmentDate: appointment.appointmentDate
      
      }));

    res.status(200).json({
      status: 'success',
      message: 'Appointment fetched Successfully',
      data: {
        appointment: newAppointment,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to Fetch appointment.',
      error: error.message,
    });
  }
});


export const updateAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params.id;
    // const updatedAppointmentData = req.body;
    console.log("app Id", appointmentId)
    // Find the appointment by the provided appointmentId
    const appointments = await appointment.findOneAndReplace({_id: appointmentId}, req.body, {new:true});

    if (!appointments) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Update the appointment with the new data
    // appointments.set(updatedAppointmentData);
    await appointments.save();

    res.status(200).json(appointments);
  } catch (error) {
    console.error('Error updating appointment:', error);
    res.status(500).json({ message: 'Error updating appointment' });
  }
};

export const deleteAppointment = asyncHandler(async (req, res) => {
    try {
      const { appointmentId } = req.params;
  
      const result = await appointment.deleteOne({ appointmentId: appointmentId });
  
      if (result.deletedCount === 0) {
        return res.status(404).json({
          status: 'error',
          message: 'Appointment not found'
        });
      }
  
      res.status(200).json({
        status: 'success',
        message: 'Appointment deleted successfully',
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

  // export const createAppointment = asyncHandler(async (req, res) => {
//     try {

//       const newAppointment = await appointment.create(req.body);
//       res.status(200).json({
//         status: 'success',
//         message: 'Appointment Created Successfully',
//         data: {
//           appointment: newAppointment,
//         },
//       });
//     } catch (error) {
//       console.log(error);
//       res.status(500).json({
//         status: 'error',
//         message: 'Failed to create Appointment.',
//         error: error.message,
//       });
//     }
//   });