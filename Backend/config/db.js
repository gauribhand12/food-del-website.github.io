import mongoose from "mongoose";

export  const connectDB = async () =>{

    await mongoose.connect('mongodb+srv://bhandgauri:8805098343@cluster0.imi1l.mongodb.net/food-del').then(()=>console.log("DB Connected"));
}