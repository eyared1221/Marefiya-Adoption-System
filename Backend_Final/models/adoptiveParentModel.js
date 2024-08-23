import mongoose from 'mongoose';

const adoptiveParentSchema = new mongoose.Schema({

    adoptiveParentId: {
        type: String,
    },
    // Foster father's detail
    f_firstName: {
        type: String,
    },
    f_middleName: {
        type: String,
    },
    f_lastName: {
        type: String,
    },
    f_phoneNumber: {
        type: Number,
    },
    f_email: {
        type: String,
    },
    f_nationality: {
        type: String,
    },
    f_occupation: {
        type: String,
    },
    address: {
        type: String,
    },
    f_kebeleDocument: {
        type: String,
    },
    f_medicalDocument: {
        type: String,
    },
    f_birthCertificate: {
        type: String,
    },
    f_picture: {
        type: String,
    },

    // Foster mother's detail
    m_firstName: {
        type: String,
    },
    m_middleName: {
        type: String,
    },
    m_lastName: {
        type: String,
    },
    m_phoneNumber: {
        type: Number,
    },
    m_nationality: {
        type: String,
    },
    m_occupation: {
        type: String,
    },
    m_kebeleDocument: {
        type: String,
    },
    m_medicalDocument: {
        type: String,
    },
    m_birthCertificate: {
        type: String,
    },
    m_picture: {
        type: String,
    },

    // Additional Information
    economicStatus: {
        type: String,
    },
    policeClearance: {
        type: String,
    },
    marriageCertificate: {
        type: String,
    },
    status: {
        type: String,
        default: "Not Child"
      }
});

adoptiveParentSchema.pre('save', async function (next) {
    if (this.isNew && !this.adoptiveParentId) {
      let randomNumber;
      let caseExists = true;
      while (caseExists) {
        randomNumber = Math.floor(1000 + Math.random() * 9000);
        caseExists = await adoptiveParent.exists({ adoptiveParentId: 'AP' + randomNumber });
      }
      this.adoptiveParentId = 'AP' + randomNumber;
    }
    next();
  });


const adoptiveParent = mongoose.model('adoptiveParent', adoptiveParentSchema);

export default adoptiveParent;

