import express  from "express";
import dotenv from 'dotenv/config';
import cors from 'cors';
import connectDb from "./config/db.js";
import veterinarioRoutes from './routes/veterinarioRoutes.js'
import pacienteRoutes from './routes/pacienteRoutes.js';

const app = express();
app.use(express.json())

connectDb();

const dominiosPermitidos = ["http://localhost:5173"];

const corsOptions = {
    origin: function(origin, callback){
        if(dominiosPermitidos.indexOf !== -1 ){
            callback(null, true);
        } else {
            callback(new Error('No permitido por cors'))
        }
    }
}

app.use(cors(corsOptions));

const port = process.env.PORT;

app.use('/api/veterinarios', veterinarioRoutes);
app.use('/api/pacientes', pacienteRoutes);



app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`)
})