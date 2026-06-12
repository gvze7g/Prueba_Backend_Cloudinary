import mongoose from 'mongoose';

const medicationSchema = new mongoose.Schema (
    {
        medicineName: {
            type: String,
        }
    },
    {
        _id: false
    }
);

const medicalRecordSchema = new mongoose.Schema({
        patient_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Patient',
        },
        diagnosis:{
            type: String
        },
        medicationName: [medicationSchema],
        medicalNotes: {
            type: String
        }
});


export default mongoose.model('MedicalRecord', medicalRecordSchema);


