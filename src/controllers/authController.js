import bcrypt from 'bcryptjs';
import Patient from '../models/Patient.js';
import generateCode from '../utils/generateCode.js';
import generateToken from '../utils/generateToken.js';
import {sendVerificationEmail, sendPasswordResetEmail} from '../services/emailService.js';

export const register = async (req, res) => {
    try{
        const{
            name,
            lastName,
            email,
            password,
            birthDate,
            phone,
            address,
            bloodType,
        } = req.body;

        const patientExists = await Patient.findOne({
            email
        });

        if (patientExists){
            return res.status(400).json({
                message: 'El correo ya existe'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationCode = generateCode();

        const patient = await Patient.create({
            name,
            lastName,
            email,
            password: hashedPassword,
            birthDate,
            phone,
            address,
            bloodType,
            verificationCode,
            verificationExpires: Date.now() + 15 * 60 * 1000
        });

        await sendVerificationEmail(email, verificationCode);

        res.status(201).json({message: 'Paciente registrado correctamente'});
        
    }catch(error) {
        res.status(500).json({message: error.message});
    }
};

export const verifyEmail = async(req, res) => {
    try{
        const {email, code} = req.body;
        const patient = await Patient.findOne({email});

        if(!patient){return res.status(404).json({
        message: 'Paciente no encontrado'
            });
        }

        if(patient.verificationCode !== code) {
            return res.status(400).json({
            message: 'Codigo invalido'
            });
        }

        patient.isVerified = true;

        patient.verificationCode = undefined;

        patient.verificationExpires = undefined;

        await patient.save();

        res.json({
            message: 'Correo verificado correctamente'
        });

    }catch(error){
        res.status(500).json({
            message: error.message
        });
    }
};

export const login = async (req, res) => {
    try{
        const {email, password} = req.body;
        const patient = await Patient.findOne ({
            email
        });

        if(!patient){
            return res.status(400).json({
                message: 'Credenciales incorrectas'
            });
        }

        if(!patient.isVerified) {
            return res.status(401).json({
                message: "Debes verificar tu correo"
            })
        }

        if(
            patient.timeOut && patient.timeOut > Date.now()
        ){
            return res.status(403).json({
                message: 'Cuenta bloqueada temporalmente'
            });
        }

        const validPassword = await bcrypt.compare(
            password, patient.password
        );

        if(!validPassword){
            patient.loginAttempts += 1;
            if(patient.loginAttempts >= 5){
                patient.timeOut= Date.now() + 15 * 60 * 1000;
            }

            await patient.save();
            return res.status(400).json({
                message: 'Credenciales incorrectas'
            });
        }

        patient.loginAttempts = 0;
        patient.timeOut = null;
        await patient.save();
        const token = generateToken(
            patient._id
        );

        res.json({
            token
        });

    }catch(error){
        res.status(500).json({
            message: error.message
        });
    }
};

export const forgotPassword = async (req, res) => {
    try{
        const {email} = req.body;
        const patient = await Patient.findOne({
            email
        });

        if(!patient){
            return res.status(404).json({
                message: 'Paciente no encontrado'
            });
        }

        const resetCode = generateCode();
            patient.resetCode = resetCode;
            patient.resetCodeExpires = Date.now() + 15 * 60 * 1000;

            await patient.save();

            await sendPasswordResetEmail(
             email,
                resetCode
            );

            res.json({
                message: 'Codigo enviado al correo'
            });

    } catch(error){
        res.status(500).json({
            message: error.message
        });
    }
};

export const resetPassword = async (req, res) => {
    try{
        const {
            email,
            code,
            newPassword
        } = req.body;

        const patient = await Patient.findOne({
            email
        });

        if(!patient){
            return res.status(404).json({
                message: 'Paciente no encontrado'
            });
        }

        if(patient.resetCode !== code){
            return res.status(400).json({
                message: 'Codigo invalido'
            });
        }

        const hashedPassword = await bcrypt.hash(
            newPassword, 10
        );

        patient.password = hashedPassword;
        patient.resetCode = undefined;
        patient.resetCodeExpires = undefined;

        await patient.save();

        res.json({
            message: 'Contraseña actualizada'
        });

    }catch(error){
        res.status(500).json({
            message: error.message
        });
    }
};