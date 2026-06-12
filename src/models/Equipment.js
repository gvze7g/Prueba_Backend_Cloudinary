import mongoose from "mongoose";

const equipmentSchema = new mongoose.Schema(
    {
        EquipmentName: {
            type: String,
            trim: true
        },
        description: {
            type: String
        },
        brand:{
            type: String
        },
        model:{
            type: String
        },
        purchaseDate:{
            type: Date
        },
        maintenanceDate:{
            type: Date
        },
        condition:{
            type: String
        },
        image: {
            type: String,
            default: null
        },
        status:{
            type: String,
        },
        isAvailable: {
            type: Boolean,
            default: false
        },
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default mongoose.model('Equipment', equipmentSchema);