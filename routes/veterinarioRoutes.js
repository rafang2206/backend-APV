import express from 'express';
import { registrar, 
        perfil, 
        confirmado, 
        autenticar, 
        olvidePassword,
        comprobarToken, 
        nuevoPassword,
        cambiarPassword,
        actualizarDatos
        } from '../controllers/veterinarioControllers.js';
import checkAuth from '../middleware/authMiddleware.js';

const router = express.Router();

//area publica
router.post('/', registrar);
router.get('/confirmado/:token', confirmado);
router.post('/login', autenticar);
router.post('/recuperar-password', olvidePassword);
router.route('/recuperar-password/:token').get(comprobarToken).post(nuevoPassword);


// area privada
router.get('/perfil', checkAuth, perfil);
router.post('/perfil/:id', checkAuth, cambiarPassword)
router.put('/perfil/:id', checkAuth, actualizarDatos)

export default router;