import { login } from '../database/admin.database.js'
import { decrypt } from "../utils/hash.js"
import { createToken } from "../config/jwt.js"

const loginController = async(req, res) => {
    try {
        const {email, password} = req.body

        if(!email || !password){
            return res.status(400).json({
                ok: false,
                msg: 'Todos los campos son obligatorios'
            })
        }

        const verifyEmail = await login("admin", email.trim());
        const verifyEmailUser = await login("employee", email.trim());

        if(!verifyEmail && !verifyEmailUser){
            return res.status(400).json({
                ok: false,
                msg: 'Usuario no registrado'
            })
        }

        let verify = false;
        let userData = null;

        if(verifyEmail){
            verify = await decrypt(password, verifyEmail.password);
            userData = verifyEmail;
            
        } else if(verifyEmailUser){
            verify = await decrypt(password, verifyEmailUser.password);
            userData = verifyEmailUser;
        }

        if(!verify){
            return res.status(400).json({
                ok: false,
                msg: 'Credenciales erroneas'
            })
        }
        
        const token = createToken(userData.id)

        return res.status(201).json({
            ok: true,
            token: token,
            data: userData
        })
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: `Se produjo un error: ${error.message}`
        });
    }
}

export {
    loginController
}
