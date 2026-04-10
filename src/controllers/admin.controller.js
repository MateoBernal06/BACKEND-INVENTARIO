import {
  createUser,
  users,
  getUser,
  deleteUser,
  activateUser,
  desactivateUser
} from "../database/admin.database.js";
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
                msg: "No se puede registrar el correo electrónico"
            })
        }
        
        const phoneVerificate = await verifyPhone("employee", phoneUser);
        if(phoneVerificate){
            return res.status(400).json({
                ok: false,
                msg: "Número de teléfono ya registrado"
            })
        }

        if(phoneUser.length != 10){
            return res.status(400).json({
                ok: false,
                msg: "Número de teléfono debe tener 10 dígitos"
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

const getUsersController = async (req, res) => {
    try {

        const getUsers = await users();
        
        if (getUsers.length === 0) {
          return res.status(201).json({
            ok: true,
            msg: "No se encontraron usuarios",
          });
        }

        return res.status(200).json({
            ok: true,
            users: getUsers
        })

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: `Se produjo un error: ${error.message}`,
        });
    }
}

const deleteUserController = async (req, res) => {
    try {
        const {id} = req.params

        const user = await getUser(id)

        if(!user[0]){
            return res.status(404).json({
                ok: false,
                msg: "Usuario no encontrado"
            })
        }

        await deleteUser(id)

        return res.status(200).json({
            ok: true,
            msg: "Usuario eliminado exitosamente",
        });
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: `Se produjo un error: ${error.message}`,
        });
    }
}

const getUserController = async (req, res) => {
    try {
        const {id} = req.params
        const user = await getUser(id);

        if (!user[0]) {
            return res.status(404).json({
                ok: false,
                msg: "Usuario no encontrado",
            });
        }

        return res.status(200).json({
            ok: true,
            user: user[0]
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: `Se produjo un error: ${error.message}`,
        });
    }
}


const statusUserController = async (req, res) => {
    try {

        const {id} = req.params
        const user = await getUser(id);

        if (!user[0]) {
            return res.status(404).json({
                ok: false,
                msg: "Usuario no encontrado",
            });
        }

        if(user[0].status){
            await desactivateUser(id)
            return res.status(201).json({
                ok: true,
                msg: "Usuario desactivado",
            });
        }

        if (!user[0].status) {
            await activateUser(id);
            return res.status(201).json({
                ok: true,
                msg: "Usuario reactivado",
            });
        }
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: `Se produjo un error: ${error.message}`,
        });
    }
}

export { createUserController, getUsersController, deleteUserController, getUserController, statusUserController }