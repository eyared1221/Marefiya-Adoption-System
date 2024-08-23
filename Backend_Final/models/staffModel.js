import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

function generateRandomNumber() {
  return Math.floor(1000 + Math.random() * 9000);
}

function generateStaffId(role) {
  let prefix;
  switch (role) {
    case 'Orphanage Manager/Director':
      prefix = 'OM';
      break;
    case 'Social Worker':
      prefix = 'SW';
      break;
    case 'System Administrator':
      prefix = 'SA';
      break;
    default:
      prefix = 'UNK'; // Unknown role prefix
  }

  return prefix + generateRandomNumber();
}

const staffSchema = new mongoose.Schema(
  {
    // Personal Information
    staffId: {
      type: String,
      default: function () {
        return generateStaffId(this.role);
      },
      unique: true,
    },
    firstName: {
      type: String,
    },
    middleName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    dateOfBirth: {
      type: Date,
    },
    gender: {
      type: String,
    },
    phoneNumber: {
      type: Number,
    },
    email: {
      type: String,
    },
    address: {
      type: String,
    },
    country: {
      type: String,
    },
    kebeleDocument: {
      type: String,
    },
    role: {
      type: String,
      enum: [
        'Orphanage Manager/Director',
        'Social Worker',
        'System Administrator',
      ],
    },
    emergancyPersonFirstName: {
      type: String,
    },
    emergancyPersonLastName: {
      type: String,
    },
    emergancyPersonPhone: {
      type: String,
    },
    emergancyPersonAddress: {
      type: String,
    },
    current_case: {
        type: Number,
        default: 0,
         function () {
          return this.role && this.role === 'Social Worker';
        },
      },
      adminPassword: {
        type: String,
         function () {
          return this.role && this.role === 'System Administrator';
        },
      },
      workerPassword: {
        type: String,
         function () {
          return this.role && this.role === 'Social Worker';
        },
      },
      managerPassword: {
        type: String,
         function () {
          return this.role && this.role === 'Orphanage Manager/Director';
        },
      },
    },
  {
    timestamps: true,
  }
);
staffSchema.methods.comparePasswordInDb = async function (pswd) {
    try {
      let passwordField;
  
      switch (this.role) {
        case 'Social Worker':
          passwordField = this.workerPassword;
          break;
        case 'Orphanage Manager/Director':
          passwordField = this.managerPassword;
          break;
        case 'System Administrator':
          passwordField = this.adminPassword;
          break;
        default:
          throw new Error('Invalid role');
      }
  
      // Use bcrypt.compare to compare the provided password with the respective password field
      const isMatch = await bcrypt.compare(pswd, passwordField);
  
      return isMatch;
    } catch (error) {
      // Handle any errors that occur during the password comparison
      throw new Error('Error comparing passwords');
    }
  };
  
  staffSchema.pre('save', async function (next) {
    if (!this.isModified('adminPassword') && !this.isModified('workerPassword') && !this.isModified('managerPassword')) {
      const currentYear = new Date().getFullYear();
      const passwordFormat = `${this.lastName}@${currentYear}`;
      
  
      switch (this.role) {
        case 'Social Worker':
          if (!this.workerPassword) {
            this.workerPassword = `SW${passwordFormat}`;
            this.workerPassword = await bcrypt.hash(this.workerPassword, 12);
          }
          break;
        case 'Orphanage Manager/Director':
          if (!this.managerPassword) {
            this.managerPassword = `OM${passwordFormat}`;
            this.managerPassword = await bcrypt.hash(this.managerPassword, 12);
          }
          break;
        case 'System Administrator':
          if (!this.adminPassword) {
            this.adminPassword = `SA${passwordFormat}`;
            this.adminPassword = await bcrypt.hash(this.adminPassword, 12);
          }
          break;
        default:
          break;
      }
    }
  
    const existingStaff = await this.constructor.findOne({ email: this.email });
    if (existingStaff) {
      const err = new Error('Email already exists');
      return next(err);
    }
  
    next();
  });




const staff = mongoose.model('staff', staffSchema);

export default staff;

