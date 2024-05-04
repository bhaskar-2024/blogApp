import { app } from "./app.js";
import dotenv from "dotenv"
import { dbConnect } from "./db/index.js";



dotenv.config({
    path: './.env'
})

dbConnect()
    .then(()=> {
        console.log("database connected");
    })
    .catch((error) => {
        console.log("error connecting database" ,error)
    })

app.listen(process.env.PORT || 3000 , () => {
    console.log("server is running at port - " , process.env.PORT || 3000);
})