import { createClient } from "@supabase/supabase-js";
const apiKey = import.meta.env.VITE_SUPABASE_KEY;
const baseUrl = import.meta.env.VITE_SUPABASE_SECRET;
const supabase = createClient(apiKey, baseUrl);
export default supabase;