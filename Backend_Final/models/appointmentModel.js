import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({

    appointmentId: {
        type: String,
    },
    staffId: {
        type: String,
    },
    appointmentTitle: {
        type: String,
    },
    appointmentDescription: {
        type: String,
    },
    appointmentDate: {
        type: String,
    },

    
});

appointmentSchema.pre('save', async function (next) {
    if (this.isNew && !this.appointmentId) {
      let randomNumber;
      let appointmentExists = true;
      while (appointmentExists) {
        randomNumber = Math.floor(1000 + Math.random() * 9000);
        appointmentExists = await appointment.exists({ appointmentId: 'APP' + randomNumber });
      }
      this.appointmentId = 'APP' + randomNumber;
    }
    next();
});

const appointment = mongoose.model('appointment', appointmentSchema);

export default appointment;
