import mongoose from "mongoose";

const carSchema =  mongoose.Schema(
    {
        licensePlate :{
            type : String,
            required:true,
        },
        brand :{
            type : String,
            required:true,
        },
        model :{
            type : String,
            required:true,
        },
        remarks :{
            type : String,
            required:true,
        },
        etc:{
            type : String,
            required:true,
        }
    },
    {
        timestamps:true
    }
)

export const  Car =mongoose.model("Cat",carSchema)