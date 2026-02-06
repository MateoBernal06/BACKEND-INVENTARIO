import { createClient } from "@supabase/supabase-js"; 
import 'dotenv/config'

export const supabase = createClient(
    process.env.URL_SUPABASE,
    process.env.KEY_SUPABASE,
);


