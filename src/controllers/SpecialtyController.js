import Speciality from '../models/Specialty.js'

export const createSpeciality = async (req, res) => {
    try{
        const speciality = await Speciality.create(req.body);
        res.status(201).json(speciality);
    }catch (error){
        res.status(500).json({message: error.message });
    }
};

export const getSpecialities = async (req, res) => {
    try{
        const specialties = await Speciality.find();
        res.json(specialties);
    }catch(error){
        res.status(500).json({
            message: error.message
        });
    }
};

export const getSpecialityById = async (req, res) => {
    try{
        const speciality = await Speciality.findById(
            req.params.id
        );
        res.json(speciality)
    }catch(error){
        res.status(500).json({
            message: error.message
        });
    }
};

export const updateSpeciality = async (req, res) => {
    try{
        const speciality = await Speciality.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        );
        res.json(speciality);
    }catch(error){
        res.status(500).json({
            message: error.message
        });
    }
};

export const deleteSpeciality = async (req, res) => {
    try{
        await Speciality.findByIdAndDelete(req.params.id);
        res.json({
            message: 'Especialidad medica eliminada'
        });
    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }
};