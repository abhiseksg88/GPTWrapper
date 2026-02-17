const requiredVars = ['VITE_SUPABASE_URL', 'VITE_SUPABASE_ANON_KEY'];

export function getMissingEnvVars() {
  return requiredVars.filter((name) => !import.meta.env[name]);
}

export function hasSupabaseEnv() {
  return getMissingEnvVars().length === 0;
}
