import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

/*rutas aqui*/
import Auth from './routes/authRoute.js';

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

/*app.use('/api/ruta', ruta) aqui*/
app.use('/api/auth', Auth)

export default app;
