import bcrypt from 'bcrypt'

const encrypt = async(text) => {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(text, salt)
}

const decrypt = async(text, hash) => {
    return await bcrypt.compare(text, hash)
}

export {
    encrypt, decrypt
}