import { hasSupabaseEnv } from './env';

export function getSupabaseHeaders() {
  if (!hasSupabaseEnv()) {
    return null;
  }

  return {
    apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
    Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
    'Content-Type': 'application/json',
  };
}

export async function healthcheckSupabase() {
  if (!hasSupabaseEnv()) {
    return { ok: false, reason: 'missing_env' };
  }

  const url = `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: getSupabaseHeaders(),
    });

    return { ok: response.ok, status: response.status };
  } catch {
    return { ok: false, reason: 'network_error' };
  }
}
