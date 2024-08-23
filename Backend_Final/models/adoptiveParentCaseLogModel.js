import mongoose from 'mongoose';

// Adoptive Parent CaseLog
const AdoptiveParentCaseLogSchema = new mongoose.Schema({
  parentCaseLogId: { 
    type: String
  },
    caseId: { 
      type: String
    },
    pCaseLogDoc: { 
      type: String
    },
    pDate: { 
      type: String,
      default: new Date().toISOString().slice(0, 10)
    },
    pStatus: { 
      type: String
    },
  });

  AdoptiveParentCaseLogSchema.pre('save', async function (next) {
    if (this.isNew && !this.parentCaseLogId) {
      let randomNumber;
      let adoptiveParentCaseLogExists = true;
      while (adoptiveParentCaseLogExists) {
        randomNumber = Math.floor(1000 + Math.random() * 9000);
        adoptiveParentCaseLogExists = await AdoptiveParentCaseLog.exists({ parentCaseLogId: 'APCL' + randomNumber });
      }
      this.parentCaseLogId = 'APCL' + randomNumber;
    }
    next();
});
  
  const AdoptiveParentCaseLog = mongoose.model('adoptiveParentCaseLog', AdoptiveParentCaseLogSchema);
  export default AdoptiveParentCaseLog;
  

