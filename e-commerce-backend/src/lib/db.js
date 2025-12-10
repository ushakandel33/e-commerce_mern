import mongoose from "mongoose";
 
const MONGO_URI=process.env.MONGO_URI
export const ConnectDb=async()=>{
    try {
        const conn = await mongoose.connect(MONGO_URI)
    console.log(`db connected ${conn.connection.host}`)
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

