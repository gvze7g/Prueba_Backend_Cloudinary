import app from './src/app.js'
import connectDB from './src/config/database.js';

const PORT = process.env.PORT || 4000;

await connectDB();

app.listen(PORT, () => {
    console.log(`Servidor ejectuandose en puerto ${PORT}`);
});