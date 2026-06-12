import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

/*rutas aqui*/
import Auth from './routes/authRoute.js';
import Appointment from './routes/appointmentRoute.js';
import Equipment from './routes/equipmentRoute.js';
import Patient from './routes/patientRoute.js';
import Specialty from './routes/specialtyRoute.js';

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

/*app.use('/api/ruta', ruta) aqui*/
app.use('/api/auth', Auth);
app.use('/api/appointments', Appointment);
app.use('/api/equipments', Equipment);
app.use('/api/patients', Patient);
app.use('/api/specialities', Specialty);

export default app;
