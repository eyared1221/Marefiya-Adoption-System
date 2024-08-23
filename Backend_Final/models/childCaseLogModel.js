import mongoose from 'mongoose';
 
 // Child CaseLog
  const ChildCaseLogSchema = new mongoose.Schema({
    childCaseLogId: { 
      type: String
    },
      caseId: { 
        type: String
      },
      cCaseLogDoc: { 
        type: String
      },
      cDate: { 
        type: String,
        default: new Date().toISOString().slice(0, 10)
      },
      cStatus: { 
        type: String
      },
  });
  ChildCaseLogSchema.pre('save', async function (next) {
    if (this.isNew && !this.childCaseLogId) {
      let randomNumber;
      let childCaseLogExists = true;
      while (childCaseLogExists) {
        randomNumber = Math.floor(1000 + Math.random() * 9000);
        childCaseLogExists = await ChildCaseLog.exists({ childCaseLogId: 'CHCL' + randomNumber });
      }
      this.childCaseLogId = 'CHCL' + randomNumber;
    }
    next();
});


  const ChildCaseLog = mongoose.model('childCaseLog', ChildCaseLogSchema);
  export default ChildCaseLog;

