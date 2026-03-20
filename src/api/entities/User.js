import { supabase } from '../supabaseClient';

export const User = {
  async me() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');
    const { data: profile, error } = await supabase.from('profiles').select('*').eq('id', user.id).single();
    if (error) throw error;
    return { ...profile, email: user.email };
  },

  async updateMe(updates) {
    const { data: { user } } = await supabase.auth.getUser();
    const { data, error } = await supabase.from('profiles').update(updates).eq('id', user.id).select().single();
    if (error) throw error;
    return data;
  }
};
