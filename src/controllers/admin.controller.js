import { verifyEmail, verifyPhone, registrerAdmin } from "../database/admin.database.js"
import { encrypt } from "../utils/hash.js"

const registrer = async(req, res) => {
    try {
        const {name, email, phone, password} = req.body

        if (!name || !email || !phone || !password) {
            return res.status(400).json({
                ok: false,
                msg: 'Campos vacios'
            })
        }

        const emailVerification = await verifyEmail(email)

        if(emailVerification){
            return res.status(400).json({
                ok: false,
                msg: 'Correo invalido'
            })
        }

        const phoneVerification = await verifyPhone(phone)

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

        registrerAdmin({
            name,
            email,
            phone,
            password: await encrypt(password),
        });

        res.status(200).json({
            ok: true,
            msg: "Registro exitoso",
        });
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: `Se produjo el siguiente error: ${error.message}`,
        });
    }
}

export {
    registrer
}
