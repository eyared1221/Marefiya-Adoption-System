import mongoose from 'mongoose';

const caseSchema = new mongoose.Schema({

    caseId: {
        type: String,
    },
    staffId: {
        type: String,
    },
    adoptiveParentId: {
        type: String,
    },
    childId: {
        type: String,
    },
    newCaseName: {
        type: String,
    },
    newAssignedDate: {
        type: String,
        default: new Date().toISOString().slice(0, 10),
    },
    newAssignedBy: {
        type: String,
    }
});

caseSchema.pre('save', async function (next) {
    if (this.isNew && !this.caseId) {
      let randomNumber;
      let caseExists = true;
      while (caseExists) {
        randomNumber = Math.floor(1000 + Math.random() * 9000);
        caseExists = await Case.exists({ caseId: 'CA' + randomNumber });
      }
      this.caseId = 'CA' + randomNumber;
    }
    next();
  });

const Case = mongoose.model('Case', caseSchema);

export default Case;

