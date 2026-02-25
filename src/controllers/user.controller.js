import {createUser} from '../database/user.database.js';
import { verifyEmail, verifyPhone } from '../database/validations.database.js';
import { encrypt } from '../utils/hash.js';

const createUserController = async (req, res) => {
    try {

        const adminId = req.id;
        const { name, surname, email, phone, password, address } = req.body;

        let nameUser = name.trim();
        let surnameUser = surname.trim();
        let emailUser = email.trim();
        let phoneUser = phone.trim();
        let passwordUser = password.trim();
        let addressUser = address.trim();

        if (!nameUser || !surnameUser || !emailUser || !phoneUser || !passwordUser || !addressUser) {
            return res.status(400).json({
                ok: false,
                msg: "Todos los campos son obligatorios"
            })
        }

        const emailVerificate = await verifyEmail("employee", emailUser);
        if(emailVerificate){
            return res.status(400).json({
                ok: false,
                msg: "Correo electrónico ya registrado"
            })
        }

        if(phoneUser.length != 10){
            return res.status(400).json({
                ok: false,
                msg: "Número de teléfono debe tener 10 dígitos"
            })
        }

        const phoneVerificate = await verifyPhone("employee", phoneUser);
        if(phoneVerificate){
            return res.status(400).json({
                ok: false,
                msg: "Número de teléfono ya registrado"
            })
        }
        
        if(passwordUser.length < 12 || passwordUser.length > 16){
            return res.status(400).json({
                ok: false,
                msg: "La contraseña debe tener entre 12 y 16 caracteres",
            });
        }

        await createUser({
            name: nameUser,
            surname: surnameUser,
            email: emailUser,
            phone: phoneUser,
            password: await encrypt(passwordUser),
            address: addressUser,
            admin_id: adminId
        })

        return res.status(201).json({
            ok: true,
            msg: "Usuario creado exitosamente" 
        })

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: `Se produjo un error: ${error.message}`
        });
    }
}


export { createUserController }