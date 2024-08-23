import mongoose from 'mongoose';

const caseLogSchema = new mongoose.Schema({

// cases: adoption, guardianship, foster care, custody, palcement, immigration

    case_log_name: {
        type: String, 
    },
    case_log_date: {
        type: Date,
    },
    case_log_description: {
        type: String,
    },
    case_log_documents: {
        type: String,
    }
});


const caseLog = mongoose.model('caseLog', caseLogSchema);

export default caseLog;

