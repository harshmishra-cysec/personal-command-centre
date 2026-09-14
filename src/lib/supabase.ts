import { createClient } from "@supabase/supabase-js";

const supabaseUrl: string = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey: string = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

export const isSupabaseConfigured =
  Boolean(supabaseUrl) &&
  Boolean(supabaseAnonKey) &&
  supabaseUrl.startsWith("http") &&
  !supabaseUrl.includes("placeholder");

export const supabase = createClient(
  isSupabaseConfigured ? supabaseUrl : "https://placeholder-project.supabase.co",
  isSupabaseConfigured ? supabaseAnonKey : "placeholder-anon-key",
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  },
);
