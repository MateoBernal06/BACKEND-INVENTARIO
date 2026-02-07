
import jwt from 'jsonwebtoken'
import 'dotenv/config'

export const verifyUser = (req, res, next) => {
    
    let token = req.headers.authorization

    if(!token){
        return res.status(401).json({
            ok: false,
            msg: 'Token no proporcionado'
        })
    }

    token = token.split(" ")[1]

    try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET);
        req.id = id
        next()
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: `Token invalido`
        });
    }
}