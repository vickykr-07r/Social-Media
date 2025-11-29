import mongoose from "mongoose"

 let connectdb =async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        .then(()=>{
         console.log(`mongodb connected`)
        })
    } catch (error) {
        console.log(`got error on connecting monogodb ${error}`)
    }
}

export default connectdb;