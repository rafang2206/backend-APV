import nodemailer from 'nodemailer';
import Veterinario from "../models/Veterinario.js"
import generarJWT from "../utils/generarJWT.js";
import generarId from "../utils/generarId.js";
import emailRegistro from "../utils/emailRegistro.js";


const registrar = async (req, res) => {

    const { email, nombre } = req.body;

    const existeUsuario = await Veterinario.findOne({ email });

    if(existeUsuario){
        const error = new Error(`el correo ${existeUsuario.email} ya se encuentra registrado`);
        return res.status(400).json({msg: error.message});
    }
    
    try {
        const veterinario = new Veterinario(req.body);
        const veterinarioGuardado = await veterinario.save();

        emailRegistro({email, nombre, token: veterinarioGuardado.token});
        
        res.json(veterinarioGuardado)
    } catch (error) {
        console.log(error)
    }
}

const perfil = (req, res) => {
    const { veterinario } = req

    res.json({ perfil: veterinario })
}


const confirmado = async (req, res) => {

    const { token } = req.params;

    const usuarioConfirmado = await Veterinario.findOne({token});

    if(!usuarioConfirmado){
        const error = new Error('Usuario no existe');
        return res.status(404).json({msg: error.message});
    }

    try {
        usuarioConfirmado.token = null;
        usuarioConfirmado.confirmado = true;
        await usuarioConfirmado.save();
        res.json({msg: 'Usuario confirmado correctamente'})
    } catch (error) {
        console.log(error)
    }
}


const autenticar = async (req, res) => {

    const { email, password } = req.body;

    const usuario = await Veterinario.findOne({ email });
    
    if(!usuario){
        const error = new Error('El usuario no existe');
        return res.status(403).json({ msg: 'el usuario no existe' });
    }
    
    if(!usuario.confirmado){
        const error = new Error('El usuario no esta confirmado');
        return res.status(403).json({ msg: 'El usuario no esta confirmado' });
    }

    if( await usuario.comprobarPassword(password)){
        res.json({ token: generarJWT(usuario.id) })
    }else{
        const error = new Error('Password incorrecto');
        return res.status(403).json({ msg: 'Password incorrecto' });
    }
}

const olvidePassword = async (req, res, next) => {
    const { email } = req.body

    const usuarioVeterinario = await Veterinario.findOne({email});

    if(!usuarioVeterinario){
        const error = new Error('El usuario no existe');
        return res.status(400).json({ msg: error.message })
    }

    usuarioVeterinario.token = generarId();
    await usuarioVeterinario.save();
    res.json({msg: `te hemos enviado un correo`})
}

const comprobarToken = async (req, res, next) => {
    const { token } = req.params;

    const tokenValido = await Veterinario.findOne({ token });
    
    if(!tokenValido){
        const error = new Error('Token no valido');
        return res.status(400).json({ msg: error.message });
    }

    res.json({ msg: 'comprobando token' })
}

const nuevoPassword = async (req, res, next) => {
    const { token } = req.params;

    const { password } = req.body;

    const veterinario = await Veterinario.findOne({ token });

    if(!veterinario){
        const error = new Error('Token no valido');
        return res.status(400).json({ msg: error.message });
    }

    try {
        veterinario.token = null;
        veterinario.password = password;
        await veterinario.save();
        res.json({msg: 'password cambiado'})
    } catch (error) {
        const e = new Error('Token no valido');
        return res.status(400).json({ msg: e.message });
    }

    
}



export {
    registrar,
    perfil,
    confirmado,
    autenticar,
    olvidePassword,
    comprobarToken,
    nuevoPassword
}