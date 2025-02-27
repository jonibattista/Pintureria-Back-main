import { Resend } from "resend";
import crypto from "crypto";
import { Recover } from "./recover.class.js";
import { User } from "../Usuarios/Usuario.class.js";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (req, res) => {
  Recover.sync();
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'El email es obligatorio' });
  }
  const existingEmail = User.findOne({where:{email:email}})
  if(!existingEmail) return res.status(404).json({ error: 'El email no corresponde a ningun usuario' });
  const token = crypto.randomBytes(32).toString("hex");
  try {
    const date = Date.now()
    const response = await resend.emails.send({
      from: process.env.NODE_ENV === "production" ? "soporte@pintureriasriocolor.online":"Acme <onboarding@resend.dev>",
      to: process.env.NODE_ENV === "production" ? email : ["abirchmeyer@frro.utn.edu.ar"],
      subject: "Recuperacion de contraseña",
      html: `
      <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
      <p>El link expira en 15 minutos</p>
          <a href="${process.env.URL_FRONT}/#/recover?token=${token}">Restablecer Contraseña</a>
          `,
        });
      if(!response.data) return res.status(500).json({message:"error al enviar mail de recuperacion"})
      await Recover.create({ email: email, token: token, createdAt:date });
      res.status(200).json({ message: "Correo de recuperacion enviado con exito" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const searchToken = async (req, res) => {
  Recover.sync();
  const { token } = req.params;
  try {
    const response = await Recover.findOne({where:{token:token}});
    res
      .status(200)
      .json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const searchAllToken = async (req, res) => {
  Recover.sync();
  const { token } = req.params;
  try {
    const response = await Recover.findAll({where:{token:token}});
    res
      .status(200)
      .json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const deleteToken = async (req, res) => {
  Recover.sync();
  const { token } = req.params;
  try {
    const response = await Recover.destroy({where:{token:token}});
    res
      .status(200)
      .json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const deleteById = async (req, res) => {
  Recover.sync();
  const { id} = req.params;
  try {
    const response = await Recover.destroy({where:{id:id}});
    res
      .status(200)
      .json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
