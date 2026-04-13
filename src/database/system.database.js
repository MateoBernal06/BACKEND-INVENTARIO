import { supabase } from "../config/database.js";

const login = async (rol, email) => {
    const { data, error } = await supabase
        .from(rol)
        .select("id, name, surname, address, email, phone, password, role")
        .eq("email", email);

    if (error) {
        throw new Error(error.message);
    }

    return data[0];
};

export {
    login
}