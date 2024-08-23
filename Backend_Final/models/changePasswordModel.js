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
    newCaseName: {
        type: String,
    },
    newAssignedDate: {
        type: String,
    },
    newAssignedBy: {
        type: String,
    }
});

const Case = mongoose.model('ChangePassword', caseSchema);

export default Case;

