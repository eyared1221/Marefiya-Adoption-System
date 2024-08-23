import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema({

    // Personal Information
    full_name: {
    },
    subject: {
        type: String,
    },
    inquiry_message: {
        type: String,
    },
    inquiry_document: { 
        type: Buffer,
    },
    date_of_inquiry: {
        type: Date,
    },
});


const inquiry = mongoose.model('inquiry', inquirySchema);

export default inquiry;

