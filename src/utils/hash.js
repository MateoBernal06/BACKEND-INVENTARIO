import bcrypt from 'bcrypt'

const encrypt = async(text) => {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(text, salt)
    return hash
}

const decrypt = async(hash, text) => {
    const compare = await bcrypt.compare(text, hash)
    console.log(compare)
}

export {
    encrypt, decrypt
}