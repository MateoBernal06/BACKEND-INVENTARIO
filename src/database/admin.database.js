import { supabase } from "../config/database.js";

const verifyEmail = async(email) => {
    try {
        const { data, error } = await supabase
            .from("admin")
            .select("name")
            .eq("email", email);

        if(data[0]){
            return data
        }

    } catch (error) {
        console.log(error.message);
    }
}

const verifyPhone = async (phone) => {
    try {
        const { data, error } = await supabase
        .from("admin")
        .select("name")
        .eq("phone", phone);

        if (data[0]) {
            return data;
        }

    } catch (error) {
        console.log(error.message);
    }
};

const registrerAdmin = async(data) => {

    const { name, email, phone, password } = data;

    try {
        const { data, error } = await supabase
            .from("admin")
            .insert({ name, email, phone, password })
            .select();
        
        console.log(data)
        console.error(error)

    } catch (error) {
        console.log(error.message);
    }
}

export {
    verifyEmail,
    verifyPhone,
    registrerAdmin
}
