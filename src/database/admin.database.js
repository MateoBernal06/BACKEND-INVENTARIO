import { supabase } from "../config/database.js";

const createUser = async (info) => {
  const { data, error } = await supabase.from("employee").insert(info);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const users = async () => {
  const { data, error } = await supabase
    .from("employee")
    .select("id, name, surname, email, phone, address, created_at");

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const getUser = async (id) => {
  const { data, error } = await supabase
    .from("employee")
    .select("id, name, surname, email, phone, status, address, created_at")
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};


const deleteUser = async (id) => {
  const { data, error } = await supabase.from("employee").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const activateUser = async (id) => {
  const { data, error } = await supabase
    .from("employee")
    .update({ status: true })
    .eq("id", id)
    .select("name, surname, status, created_at, updated_at");

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const desactivateUser = async (id) => {
  const { data, error } = await supabase
    .from("employee")
    .update({ status: false })
    .eq("id", id)
    .select("name, surname, status, created_at, updated_at");

  if (error) {
    throw new Error(error.message);
  }

  return data;
};



export { createUser, users, getUser, deleteUser, activateUser, desactivateUser };
