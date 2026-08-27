import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseAnonKey;

export const isSupabaseConfigured = (): boolean => {
    return Boolean(supabaseUrl && (supabaseAnonKey || supabaseServiceKey));
};

// Client for public reads (client or server)
export const getSupabaseClient = () => {
    if (!supabaseUrl || !supabaseAnonKey) {
        return null;
    }
    return createClient(supabaseUrl, supabaseAnonKey);
};

// Admin client with full rights (server-side only)
export const getSupabaseAdmin = () => {
    if (!supabaseUrl || !supabaseServiceKey) {
        return null;
    }
    return createClient(supabaseUrl, supabaseServiceKey, {
        auth: {
            persistSession: false,
            autoRefreshToken: false,
        },
    });
};
