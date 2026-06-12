import Patient from '../models/Patient.js';

export const getPatients = async (req, res) => {
    try{
        const patients = await Patient.find();
        res.json(patients);
    }catch(error){
        res.status(500).json({
            message: error.message
        });
    }
};

export const getPatientById = async (req, res) => {
    try{
        const patient = await Patient.findById(
            req.params.id
        );
        res.json(patient)
    }catch(error){
        res.status(500).json({
            message: error.message
        });
    }
};

export const updatePatient = async (req, res) => {
    try{
        const patient = await Patient.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        );
        res.json(patient);
    }catch(error){
        res.status(500).json({
            message: error.message
        });
    }
};

export const deletePatient = async (req, res) => {
    try{
        await Patient.findByIdAndDelete(req.params.id);
        res.json({
            message: 'Paciente eliminado'
        });
    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }
};

export const uploadProfilePicture = async (req, res) => {
    try{
        const patient = await Patient.findById(req.params.id);
        if(!patient){
            return res.status(404).json({
                message: 'Paciente no encontrado'
            });
        }

        patient.image = req.file.path;
        await patient.save();
        res.json({
            message: 'Imagen subida', image: req.file.path
        });
    }catch(error) {
        res.status(500).json({
            message: error.message
        });
    }
};