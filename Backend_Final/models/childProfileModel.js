import mongoose from 'mongoose';
//import vaildator from 'validator';

const childProfileSchema = new mongoose.Schema({

    // Child Information
    childId:{
      type: String
    },
    firstName: {
      type: String
    },
    middleName: {
      type: String
    },
    lastName: {
      type: String
    },
    childDoB: {
      type: Date
    },
    gender: {
      type: String
    },
    city: {
      type: String
    },
    country: {
      type: String
    },
    nationality: {
      type: String
    },
    language: {
      type: String
    },

    // Family Background  
    fatherName: {
      type: String
    },
    fatherDocument: {
      type: String
    },
    motherName: {
      type: String
    },
    motherDocument: {
      type: String
    },
    // Additional Information
    medicalStatus: {
      type: String
    },
    medicalDocument: {
      type: String
    },
    placement: {
      type: String
    },
    // photograph: {
    //   type: String
    // },
    cpaDocument: {
      type: String
    },
    remark: {
      type: String
    },
    // Registration Information
    admission: {
      type: Date
    },
    status: {
      type: String,
      default: "Not assigned"
    }
});

childProfileSchema.pre('save', async function (next) {
  if (this.isNew && !this.childId) {
    let randomNumber;
    let caseExists = true;
    while (caseExists) {
      randomNumber = Math.floor(1000 + Math.random() * 9000);
      caseExists = await childProfile.exists({ childId: 'CH' + randomNumber });
    }
    this.childId = 'CH' + randomNumber;
  }
  next();
});

const childProfile = mongoose.model('childProfile', childProfileSchema);

export default childProfile;

