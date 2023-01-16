import express from 'express';
import { registrar, 
        perfil, 
        confirmado, 
        autenticar, 
        olvidePassword,
        comprobarToken, 
        nuevoPassword 
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

export default router;