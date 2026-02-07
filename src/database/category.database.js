import { supabase } from "../config/database.js";

const categories = async() => {
    const { data, error } = await supabase
        .from("products")
        .select();
    
    if(error){
        throw new Error(error.message);
    }
    return data
}

export {
    categories
}
