import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl.startsWith("http") &&
  !supabaseUrl.includes("placeholder"),
);

// Reuse the existing client on the window to prevent Vite HMR socket conflicts
const globalAny = globalThis as typeof globalThis & {
  __supabaseInstance?: ReturnType<typeof createClient>;
};

export const supabase =
  globalAny.__supabaseInstance ||
  (globalAny.__supabaseInstance = createClient(
    isSupabaseConfigured ? supabaseUrl : "https://placeholder.supabase.co",
    isSupabaseConfigured ? supabaseAnonKey : "placeholder-anon-key",
    {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: false,
      },
      realtime: {
        params: {
          eventsPerSecond: 10,
        },
      },
    },
  ));
