import { verifyEmail, verifyPhone, registrer, login } from "../database/validations.database.js"
import { encrypt, decrypt} from "../utils/hash.js"
import { createToken } from "../config/jwt.js"

const registrerUser = async(req, res) => {
    try {
        const {name, email, phone, password, address, surname} = req.body

        if (!name || !email || !phone || !password || !address || !surname) {
            return res.status(400).json({
                ok: false,
                msg: "Todos los campos son obligatorios",
            });
        }

        const emailVerification = await verifyEmail("admin", email)

        if(emailVerification){
            return res.status(400).json({
                ok: false,
                msg: 'Correo invalido'
            })
        }

        const phoneVerification = await verifyPhone("admin", phone)

        if (phoneVerification || phone.length < 10) {
            return res.status(400).json({
                ok: false,
                msg: "Numero de celular invalido",
            });
        }

        if (password.length < 10){
            return res.status(400).json({
                ok: false,
                msg: 'La contraseña debe tener al menos 10 digitos'
            })
        }

        await registrer({
            name: name.trim(),
            surname: surname.trim(),
            email: email.trim(),
            phone: phone.trim(),
            address: address.trim(),
            password: await encrypt(password),
        });

        res.status(201).json({
            ok: true,
            msg: "Registro exitoso",
        });
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: `Se produjo un error: ${error.message}`,
        });
    }
}


const loginUser = async(req, res) => {
    try {
        const {email, password} = req.body

        if(!email || !password){
            return res.status(400).json({
                ok: false,
                msg: 'Todos los campos son obligatorios'
            })
        }

        const verifyEmail = await login("admin", email.trim());
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
    registrerUser, 
    loginUser
}
