import { loginAdmin } from '../database/admin.database.js'
import { decrypt} from "../utils/hash.js"
import { createToken } from "../config/jwt.js"

const login = async(req, res) => {
    try {
        const {email, password} = req.body

        if(!email || !password){
            return res.status(400).json({
                ok: false,
                msg: 'Todos los campos son obligatorios'
            })
        }

        const verifyEmail = await loginAdmin("admin", email.trim());
        const verify = await decrypt(password, verifyEmail.password)
        
        if(!verify){
            return res.status(400).json({
                ok: false,
                msg: 'Credenciales erroneas'
            })
        }
        
        const token = createToken(verifyEmail.id)

        return res.status(201).json({
            ok: true,
            token: token,
            data: verifyEmail
        })
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: `Se produjo un error: ${error.message}`,
        });
    }
}

export {
    login
}
