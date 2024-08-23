import mongoose from 'mongoose';


const testSchema = new mongoose.Schema({
  name: {
    type: String,
    //required: true
  },
  date_of_birth: {
    type: Date,
    //required: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female'],
    //required: true
  }
});

const Test = mongoose.model('Test', testSchema);

export default Test;