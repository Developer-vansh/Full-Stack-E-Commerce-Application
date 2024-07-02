import mongoose from "mongoose"
import {DB_NAME} from '../constants.js'
const connectDB= async()=>{
    try {
     const connectionInstance=  await mongoose
     .connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
     console.log(`MONGODB connect SuccessFully !! DB HOST ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("Catched error in MONGODB Connection",error)
        process.exit(1)
    }
}

export default connectDB;



// import mongoose from "mongoose"
// import {DB_NAME} from '../constants.js'

// export default async function connectDB () {
//  try {
//     const connectionInstance=await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
//     console.log(`MONGODB connect SuccessFully !! DB HOST ${connectionInstance.connection.host}`)
//  } catch (error) {
//     console.log("MONGODB CONNECTION ERROR CATCHED",error)
//  }
// }

