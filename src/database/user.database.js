import { supabase } from "../config/database.js";

const createUser = async (info) => {
    const { data, error } = await supabase
        .from("employee")
        .insert(info);

    if (error) {
        throw new Error(error.message);
    }

    return data;

};


export { createUser }