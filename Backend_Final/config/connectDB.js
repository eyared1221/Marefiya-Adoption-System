import mongoose from "mongoose"; 
 
const connectDB = async () => { 
    try { 
        const conn = await mongoose.connect(process.env.MONGO_URL, {
            serverSelectionTimeoutMS: 60000, // 60 seconds
            socketTimeoutMS: 60000, // 60 seconds
          }); 
        console.log( 
            `connected to mongoDB database ${mongoose.connection.host}` 
        ); 
    } catch (error) { 
        console.log(`mongoDB error ${error}`); 
    } 
}; 
 
export default connectDB;

// , {
//     connectTimeoutMS: 360000, // 6 min
//     socketTimeoutMS: 360000, // 6 min
//   }