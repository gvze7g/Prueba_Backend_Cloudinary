import Equipment from '../models/Equipment.js'

export const createEquipment = async (req, res) => {
    try{
        const equipment = await Equipment.create(req.body);
        res.status(201).json(equipment);
    }catch (error){
        res.status(500).json({message: error.message });
    }
};

export const getEquipments = async (req, res) => {
    try{
        const equipments = await Equipment.find();
        res.json(equipments);
    }catch(error){
        res.status(500).json({
            message: error.message
        });
    }
};

export const getEquipmentById = async (req, res) => {
    try{
        const equipment = await Equipment.findById(
            req.params.id
        );
        res.json(equipment)
    }catch(error){
        res.status(500).json({
            message: error.message
        });
    }
};

export const updateEquipment = async (req, res) => {
    try{
        const equipment = await Equipment.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        );
        res.json(equipment);
    }catch(error) {
        res.status(500).json({
            message: error.message
        });
    }
};

export const deleteEquipment = async (req, res) => {
    try{
        await Equipment.findByIdAndDelete(req.paramas.id);
        res.json({
            message: 'Equipo eliminado'
        });
    }catch (error) {
        res.status(500).json({message:
            error.message
        });
    }
};

export const uploadImage = async (req, res) => {
    try{
        const equipment = await Equipment.findById(req.params.id);
        if(! equipment){
            return res.status(404).json({
                message: 'Equipo no encontrado'
            });
        }

        equipment.image = req.file.path;
        await equipment.save();
        res.json({
            message: 'Imagen subida', image: req.file.path
        });
    }catch(error) {
        res.status(500).json({
            message: error.message
        });
    }
};