import mongoose from "mongoose"
import app from "."
import config from "./app/config/config"



async function main (){  
    try {
        await mongoose.connect(config.DATABASE_URL as string)
        await app.listen(config.PORT,()=>{
            console.log("server is running perfectly fine.")
        })
    } catch (error) {
        console.error("🚀 ~ file: server.ts:10 ~ main ~ error:", error)   
    }
}

main()
