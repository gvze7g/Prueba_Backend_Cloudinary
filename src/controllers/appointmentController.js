import Appointment from '../models/Appointment.js';

export const createAppointment = async (req, res) => {
    try{
        const appointment = await Appointment.create(req.body);
        res.status(201).json(appointment);
    }catch (error){
        res.status(500).json({message: error.message });
    }
};

export const getAppointments = async (req, res) => {
    try{
        const appointments = await Appointment.find()
        .populate('patient_id')
        .populate('speciality_id');
        res.json(appointments);
    } catch(error){
        res.status(500).json({
            message: error.message
        });
    }
};

export const getAppointmentById = async (req, res) => {
    try{
        const appointment = await Appointment.findById(
            req.params.id
        )
        .populate('patient_id')
        .populate('speciality_id');
        res.json(appointment);
    }catch(error){
        res.status(500).json({
            message: error.message
        });
    }
};

export const updateAppointment = async (req, res) => {
    try{
        const appointment = await Appointment.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        );
        res.json(appointment);
    }catch(error) {
        res.status(500).json({
            message: error.message
        });
    }
};

export const deleteAppointment = async (req, res) => {
    try{
        await Appointment.findByIdAndDelete(req.paramas.id);
        res.json({
            message: 'Cita eliminada'
        });
    }catch (error) {
        res.status(500).json({message:
            error.message
        });
    }
};