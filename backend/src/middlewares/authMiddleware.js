import jsonwebtoken from "jsonwebtoken";
import { config } from "../config.js";

export const validateAuthCookie = (allowedTypes =[]) => {
    return (req, res, next) =>{
        try {
            //#1- Extrae el token que esta en la cookie (authCookie) ya que en esa cookie está el tipo de usuario que esta iniciando sesion
            
            const {authCookie} = req.cookies;

            if(!authCookie){
                return res.status(403).json({message: "No cookie found"});
            }

            //#2- Extraer toda la información de la cookie
            const decoded = jsonwebtoken.verify(authCookie, config.jwt.secret);

            if(!allowedTypes.includes(decoded.userType)){
                return res.status(401).json({ message: "Access denied" })
            }

            //Si tiene acceso
            next();
        } catch (error) {
            console.log("Error: " + error);
            return res.status(500).json({message: "Internal server error"});
        }
    }
}