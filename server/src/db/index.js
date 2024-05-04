import mongoose from "mongoose"

const dbConnect = async() => {

    try {
        const session  = await mongoose.connect(process.env.MONGODB_URI) 
    } catch (error) {
        console.log("error connecting db - src/db/index.js",error)
    }
    

}

export {dbConnect}