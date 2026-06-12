/*
Pacientes:

name,
lastName,
email,
password,
birthDate,
phone,
address,
bloodType,
phoneEmergencyContacts [{phone, nameEmergencyContact}],
profilePhoto,
isVerified,
loginAttempts,
timeOut
*/

import mongoose from "mongoose";

const emergencyContactSchema = new mongoose.Schema (
    {
        phone: {
            type: String
        },
        nameEmergencyContact: {
        type: String
        }
    },
    {
        _id: false
    }
);

const patientSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true
        },
        lastName:{
            type: String,
            trim: true
        },
        email:{
            type: String,
            unique: true,
            lowercase: true
        },
        password:{
            type: String
        },
        birthDate: {
            type: Date
        },
        phone:{
            type: String
        },
        address:{
            type: String
        },
        bloodType:{
            type: String
        },
        phoneEmergencyContacts: [emergencyContactSchema],
        profilePhoto: {
            type: String,
            default: null
        },
        isVerified: {
            type: Boolean,
            default: false
        },
        verificationCode: {
            type: String
        },
        verificationExpires: {
            type: Date
        },
        resetCode: {
            type: String
        },
        resetCodeExpires:{
            type: Date
        },
        loginAttempts: {
            type: Number,
            default: 0
        },
        timeOut:{
            type: Date,
            default: null
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default mongoose.model('Patient', patientSchema);