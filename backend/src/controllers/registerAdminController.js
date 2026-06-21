import nodemailer from "nodemailer"; //enviar correo
import crypto from "crypto"//
import jsonwebtoken from "jsonwebtoken"
import bcrypts from "bcryptjs"

import Admin from "../models/admins.js";

import { config } from "../config.js";
import { text } from "stream/consumers";
import { error } from "console";

const registerAdmins = {};

registerAdmins.insertAdmin = async (req, res) => {
    try {
        let {name, email, password} = req.body;

        name = name?.trim();
        email = email?.trim();
        password = password?.trim();

        if(!name || !email || !password){
            return res.status(400).json({message: "Todos los campos son requeridos"})
        }

        if(name.lenght < 3){
            return res.status(400).json({message: "name too short"})
        }

        //Validar si ya hay registro con este correo
        const existAdmins = await Admin.findOne({email})
        if(existAdmins){
            return res.status(400).json({message: "email already in use"})
        }

        if(password.lenght < 5){
            return res.status(400).json({message: "The password must be at least 5 characters long."})
        }

        //encriptar contraseña
        const passwordHash = await bcrypts.hash(password, 10);

        const newAdmin = Admin({name, email, password: passwordHash, isVerified: false})
        await newAdmin.save()

        //generar codigo aleatorio
        const verificationCode = crypto.randomBytes(3).toString("hex")

        //guardamos este codigo en un token
        const tokenCode = jsonwebtoken.sign(
            //#1 que vamos a guardar?
            {email, verificationCode},
            //#2 secret key
            config.jwt.secret,
            //#3 cuando expira?
            {expiresIn: "15m"}
        );

        res.cookie("verificationTokenCookie", tokenCode, {maxAge: 15 * 60 * 1000})

        //Enviar el correo
        //#1. Quien lo envía?
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth:{
                user: config.email.user_email,
                pass: config.email.user_password
            }
        })

        //#1.5 probando enviar HTML
        const HTMLEmail = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #074a25;">
            <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 10px; padding: 30px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                <h1 style="color: #333; text-align: center;">Paso final!</h1>
                <p style="color: #666; line-height: 1.6;">Hola <strong>${email}</strong>,</p>
                <p style="color: #666; line-height: 1.6;">Este es el paso final de tu proceso de registro, porfavor pon el siguiente codigo en la pagina de verificacion</p>
                <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0; display: flex; flex-direction: row; align-items: center; justify-content: center;">
                    <p style="margin: 0; color: #333; font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif; font-size: 40px;">${verificationCode}</p>
                </div>
                <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;">
                <p style="color: #999; font-size: 12px; text-align: center;">Este es un correo automático, por favor no responder.</p>
            </div>
        </body>
        </html>`
 
        //#2. Que se envia?
        const mailOptions = {
            from: config.email.user_email,
            to: email,
            subject: `Paso final! Codigo de verificacion: ${verificationCode}`,
            html: HTMLEmail
        }

        //#3. Enviar
        transporter.sendMail(mailOptions, (error, info) =>{
            if(error){
                console.log(error)
                return res.status(500).json({message: error})
            }

            return res.status(200).json({message: "email sent"})
        })
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({message: "Internal server error"});
    }
}

registerAdmins.verifyCode = async (req, res) => {
    try {
        //1- solicitamos el codigo
        const {verificationCodeRequest} = req.body;
        
        //2- obtenemos codigo en cookie
        const token = req.cookies.verificationTokenCookie

        //3- extraer token
        const decoded = jsonwebtoken.verify(token, config.jwt.secret);
        const { email, verificationCode: storedCode } = decoded;

        //4- comparar
        if(verificationCodeRequest !== storedCode){
            return res.status(400).json({message: "Invalid code"})
        }

        const Admins = await Admin.findOne({email});
        Admins.isVerified = true;
        await Admins.save();

        res.clearCookie("verificationTokenCookie")

        res.json({message: "Email. verified successfully"})
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({message: "Internal server error"});
    }
}

export default registerAdmins;