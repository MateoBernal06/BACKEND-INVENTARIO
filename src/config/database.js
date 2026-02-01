import { createClient } from "@supabase/supabase-js"; 
import 'dotenv/config'

const URL = process.env.URL_SUPABASE;
const KEY = process.env.KEY_SUPABASE;

export const supabase = createClient(URL,KEY);
