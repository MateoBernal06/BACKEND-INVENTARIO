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

const verifyId = async (id) => {
    const { data, error } = await supabase
        .from("categories")
        .select("code, name, description, status")
        .eq("id", id);

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

const updateCategory = async (id, info) => {

    const { data, error } = await supabase
        .from("categories")
        .update(info)
        .eq("id", id)
        .select("name, status, code, description");

    if(error){
        throw new Error(error.message);
    }
    return data;
}

const deleteCategory = async(id) => {
    const { data, error } = await supabase
        .from("categories")
        .delete()
        .eq("id", id)
        .select("name, status, code");

    if (error) {
        throw new Error(error.message);
    }
    return data;
}

const getCategory = async (id) => {
    const { data, error } = await supabase
        .from("categories")
        .select("id, name, description, status, code")
        .eq("id", id);

    if (error) {
        throw new Error(error.message);
    }

    return data;
};


const inactivateCategory = async (id) => {
    const { data, error } = await supabase
        .from("categories")
        .update({ status: false })
        .eq("id", id)
        .select("name, status, code");
    
    if (error) {
        throw new Error(error.message);
    }

    return data;

}

const activivateCategory = async (id) => {
    const { data, error } = await supabase
        .from("categories")
        .update({ status: true })
        .eq("id", id)
        .select("name, status, code");
    
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
    verifyId,
    verifyDescription,
    verifyName,
    verifyCode,
    inactivateCategory,
    activivateCategory,
    getCategory
}
