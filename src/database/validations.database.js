import { supabase } from "../config/database.js";

const verifyEmail = async(rol, email) => {
    const { data, error } = await supabase
        .from(rol)
        .select("name")
        .eq("email", email);

    if(error){
        throw new Error(error.message)
    }

    return data
    
}

const verifyPhone = async (rol, phone) => {
    const { data, error } = await supabase
        .from(rol)
        .select("name")
        .eq("phone", phone);

    if (error) {
        throw new Error(error.message);
    }

    return data;
};

const registrer = async(info) => {

    const { data, error } = await supabase
        .from("admin")
        .insert(info)
    
    if (error) {
        throw new Error(error.message);
    }

    return data;

}


const login = async(rol, email) => {

    const { data, error } = await supabase
        .from(rol)
        .select("id, name, surname, address, email, phone, password")
        .eq("email", email);
    
    if(error){
        throw new Error(error.message);
    }

    return data[0]

}

export {
    verifyEmail,
    verifyPhone,
    registrer,
    login
}
