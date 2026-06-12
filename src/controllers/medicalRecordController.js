import MedicalRecord from '../models/MedicalRecord.js'

export const createMedicalRecord = async (req, res) => {
    try{
        const medicalRecord = await MedicalRecord.create(req.body);
        res.status(201).json(medicalRecord);
    }catch (error){
        res.status(500).json({message: error.message });
    }
};

export const getMedicalRecords = async (req, res) => {
    try{
        const medicalRecords = await MedicalRecord.find();
        res.json(medicalRecords);
    }catch(error){
        res.status(500).json({
            message: error.message
        });
    }
};

export const getMedicalRecordById = async (req, res) => {
    try{
        const medicalRecord = await MedicalRecord.findById(
            req.params.id
        );
        res.json(medicalRecord)
    }catch(error){
        res.status(500).json({
            message: error.message
        });
    }
};

export const updateMedicalRecord = async (req, res) => {
    try{
        const medicalRecord = await MedicalRecord.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        );
        res.json(medicalRecord);
    }catch(error){
        res.status(500).json({
            message: error.message
        });
    }
};

export const deleteMedicalRecord = async (req, res) => {
    try{
        await MedicalRecord.findByIdAndDelete(req.params.id);
        res.json({
            message: 'Record medico eliminado'
        });
    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }
};