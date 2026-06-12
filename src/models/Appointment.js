import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
        patient_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Patient',
        },
        specialty_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Specialty',
        },
        appointmentDate:{
            type: Date
        },
        reason:{
             type: String
        },
        status:{
            type: String
        },
        Observations:{
            type: String
        }
});

export default mongoose.model('Appointment', appointmentSchema);


