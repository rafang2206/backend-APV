import nodemailer from 'nodemailer';


const emailRegistro = async (datos) => {
  const {email, nombre, token} = datos;
  
  const transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "b919cf689492b3",
      pass: "b2d3fef15e4b8b"
    }
  });

  // Enviar email
  const info = await transporter.sendMail({
      from: '"APV - Administrador Pacientes Veterinaria" <apv@correo.com>', // sender address
      to: email, // list of receivers
      subject: "APV - Comprueba tu cuenta ✔", // Subject line
      text: "Comprueba tu cuenta APV", // plain text body
      html: ` <p> Hola <strong>${nombre}</strong> <br /> Comprueba tu cuenta</p>
      <p>Hace falta solo un paso para confirmar tu cuenta, haz click en el siguiente enlace: 
      <a href='${process.env.FRONTEND_URL}/confirmar/${token}'>Comprobar Cuenta</a>
      </p>
      
      <p>Si no creaste esta cuenta puedes eliminar este mensaje</p>

      `, // html body
    });

  
  console.log('Mensaje enviado: %s', info.messageId);
};




export default emailRegistro;


