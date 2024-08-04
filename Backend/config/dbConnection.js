import mongoose from "mongoose"


mongoose.set('strictQuery',false)
const connectToDB=async()=>{

try{
    await mongoose.connect(process.env.MONGO_URI)
    console.log("Connexted Successfully")
}
catch(e){
    console.log(e);
    process.exit(1);

}
}
export default connectToDB