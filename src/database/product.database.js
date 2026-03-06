import {supabase} from '../config/database.js'


const verifyProduct = async (word, value) => {
    const { data, error } = await supabase
        .from("products")
        .select("name, description, price, stock")
        .eq(word, value);

    if (error) {
        throw new Error(error.message);
    }
    return data;
}

const createProduct = async (info) => {
    const { data, error } = await supabase
        .from("products")
        .insert(info)
        .select("*")

    if (error) {
        throw new Error(error.message);
    }
    return data;
}


const productsList = async () => {
    const { data, error } = await supabase
    .from("products")
    .select();

    if (error) {
        throw new Error(error.message);
    }
    return data;
};


const getProduct = async (id) => {
    const { data, error } = await supabase
        .from("products")
        .select('*')
        .eq("id", id);

    if (error) {
        throw new Error(error.message);
    }
    return data;
};


const deleteProduct = async (id) => {
    const { data, error } = await supabase
        .from("products")
        .delete()
        .eq("id", id)
        .select('id, name, description');

    if (error) {
        throw new Error(error.message);
    }
    return data;
}


export {
    createProduct,
    verifyProduct,
    productsList,
    getProduct,
    deleteProduct
}
