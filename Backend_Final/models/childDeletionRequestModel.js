import mongoose from 'mongoose';

const childDeletionRequestSchema = new mongoose.Schema({

    // Personal Information
    full_name: {
        type: String,
        required: [true, "please insert the child to be deleted"]
    },
    id_number: {
        type: String, 
        required: [true, "please insert the child's id number to be deleted"]
    },
    commit_message: {
        type: String,
        required: [true, "please insert the reason for deleting the child's profile."]
    },
    commit_by: {
        type: String,
        required: [true, "please insert name of the person who delete the child profile."]
    },
    date_of_childDeletionRequest: {
        type: Date,
        required: [true, "please insert the date of childDeletionRequest."]
    }
});


const childDeletionRequest = mongoose.model('childDeletionRequest', childDeletionRequestSchema);

export default childDeletionRequest;

