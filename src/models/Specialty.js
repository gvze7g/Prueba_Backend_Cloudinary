import mongoose from "mongoose";

const specialtySchema = new mongoose.Schema({
    specialityName:{
        type: String,
        trim: true
    },
    description:{
        type: String
    },
    isAvailable:{
        type: Boolean,
        default: false
    }
});

export default mongoose.model('Speciality', specialtySchema);