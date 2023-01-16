import Paciente from '../models/Pacientes.js'


const obtenerPacientes = async (req, res) => {

    const pacientes = await Paciente.find()
        .where("veterinario")
        .equals(req.veterinario)
    res.json(pacientes)
}

const agregarPaciente = async (req, res) => {
    const paciente = new Paciente(req.body);
    paciente.veterinario = req.veterinario._id;
    try{
        const pacienteAgregado = await paciente.save();
        res.json(pacienteAgregado)
    }catch(error){
        const e = new Error('Ha habido un error');
        return res.status(404).json({ msg: e.message });
    }
}


const obtenerPaciente = async (req, res) => {
    const { id } = req.params;

    try {
        const paciente = await Paciente.findById(id)
        .where("veterinario")
        .equals(req.veterinario)

        res.json(paciente);
    } catch (error) {
        const e = new Error('No estas autorizado')
        return res.status(400).json({ msg: e.message })
    }

}

const actualizarPaciente = async (req, res) => {
    const { id } = req.params;
    
    const paciente = await Paciente.findById(id);

    if(!paciente){
        return res.status(400).json({ msg: 'No encontrado' })
    }

    if(paciente.veterinario._id.toString() !== req.veterinario.id.toString()){
        return res.status(400).json({ msg: 'No estas autorizado' })
    }

    paciente.nombre = req.body.nombre || paciente.nombre;
    paciente.propietario = req.body.propietario || paciente.propietario;
    paciente.email = req.body.email || paciente.email;
    paciente.fecha = req.body.fecha || paciente.fecha;
    paciente.sintomas = req.body.sintomas || paciente.sintomas;

    try {
        const pacienteActualizado = await paciente.save();
        res.json(pacienteActualizado)
    } catch (error) {
        res.status(400).json({ msg: 'Hubo un error' })
    }
    
}

const eliminarPaciente = async (req, res) => {
    const { id } = req.params;

    try {
        await Paciente.findByIdAndDelete(id).where('veterinario').equals(req.veterinario);
        res.json({msg: 'paciente eliminado'})
    } catch (error) {
        const e = new Error('No estas autorizado')
        return res.status(400).json({ msg: e.message })
    }
}


export {
    obtenerPacientes,
    agregarPaciente,
    obtenerPaciente,
    actualizarPaciente,
    eliminarPaciente
}