import { supabase } from "../config/database.js";

const verifyName = async(name) => {
    const { data, error } = await supabase
        .from("categories")
        .select("code, name, description")
        .eq("name", name);
    
    if(error){
        throw new Error(error.message);
    }
    return data
}

const verifyDescription = async (description) => {
    const { data, error } = await supabase
        .from("categories")
        .select("code, name, description")
        .eq("description", description);

    if (error) {
        throw new Error(error.message);
    }
    return data;
};

const verifyCode = async (code) => {
    const { data, error } = await supabase
        .from("categories")
        .select("code, name, description")
        .eq("code", code);

    if (error) {
        throw new Error(error.message);
    }
    return data;
};

const categoriesList = async() => {
    const { data, error } = await supabase
        .from("categories")
        .select();
    
    if(error){
        throw new Error(error.message);
    }
    return data
}

const addCategory = async(info) => {

    const { data, error } = await supabase
        .from("categories")
        .insert(info);

    if (error) {
        throw new Error(error.message);
    }
    return data;
}

const updateCategory = async (code, info) => {

    const { data, error } = await supabase
        .from("categories")
        .update(info)
        .eq("code", code)

    if(error){
        throw new Error(error.message);
    }
    return data;
}

const deleteCategory = async(code) => {
    const { data, error } = await supabase
        .from("categories")
        .delete()
        .eq("code", code);

    if (error) {
        throw new Error(error.message);
    }
    return data;
}


export {
    categoriesList,
    addCategory,
    updateCategory,
    deleteCategory,
    verifyCode,
    verifyDescription,
    verifyName,
}
