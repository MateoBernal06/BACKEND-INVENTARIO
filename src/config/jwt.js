import jwt from 'jsonwebtoken'
import 'dotenv/config'

const createToken = (id) => {
    const token = jwt.sign({ id }, 
        process.env.JWT_SECRET,
        {
            expiresIn: '1h'
        }
    );
    return token
}

export {createToken}