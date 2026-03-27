import { supabase } from './supabaseClient';

export async function deleteUserAccount(userId) {
  if (!userId) {
    throw new Error('User ID is required');
  }

  const { data, error } = await supabase.auth.getSession();
  if (error) {
    throw error;
  }

  const accessToken = data.session?.access_token;
  if (!accessToken) {
    throw new Error('Authentication required');
  }

  const response = await fetch('/api/admin/delete-user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ userId }),
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload.error || 'Failed to delete user account');
  }

  return payload;
}
