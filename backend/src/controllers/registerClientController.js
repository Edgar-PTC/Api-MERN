import nodemailer from "nodemailer"; //enviar correo
import crypto from "crypto"//
import jsonwebtoken from "jsonwebtoken"
import bcrypts from "bcryptjs"

import clients from "../models/clients.js";

import { config } from "../config.js";
import { text } from "stream/consumers";
import { error } from "console";

const registerClient = {};

clientsController.insertClients = async (req, res) => {
    try {
        let {name, lastname, email, password, birthday, status, isVerified, loginAttemps, timeOut} = req.body;

        name = name?.trim();
        lastname = lastname?.trim();
        email = email?.trim();
        password = password?.trim();

        if(!name || !lastname || !email || !password){
            return res.status(400).json({message: "Todos los campos son requeridos"})
        }

        if(birthday >= Date.now()){
            return res.status(400).json({message: "la fecha no puede ser hoy o una en un futuro"})
        }

        if(name.lenght < 3){
            return res.status(400).json({message: "name too short"})
        }

        if(lastname.lenght < 3){
            return res.status(400).json({message: "lastname too short"})
        }

        //Validar si ya hay registro con este correo
        const existClient = await clients.findOne({email})
        if(existClient){
            return res.status(400).json({message: "email already in use"})
        }

        //Validacion de email ReGex
        const emailRegex = /^[^\s@]+@[^\s]@+\.[^\s@]+$/
        if (!emailRegex.test(email)){
            return res.status(400).json({message: "Invalid email format"})
        }

        if(password.lenght < 5){
            return res.status(400).json({message: "The password must be at least 5 characters long."})
        }

        //encriptar contraseña
        const passwordHash = await bcrypts.hash(password, 10);

        const newClient = clientsModel({name, lastname, email, password: passwordHash, birthday, status, isVerified: isVerified || false, loginAttemps, timeOut})
        await newClient.save()

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

        //#2. Que se envia?
        const mailOptions = {
            from: config.email.user_email,
            to: email,
            subject: "Ejemplo",
            text: "Tu codigo bro " + verificationCode + "Se vence pronto"
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

clientsController.verifyCode = async (req, res) => {
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

        const client = await clients.findOne({email});
        clients.isVerified = true;
        await clients.save();

        res.clearCookie("verificationTokenCookie")

        res.json({message: "Email. verified successfully"})
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({message: "Internal server error"});
    }
}

export default clientsController;