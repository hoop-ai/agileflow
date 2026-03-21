import { supabase } from '../supabaseClient';

export const UserPreferences = {
  async get() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Authentication required');
    const { data, error } = await supabase
      .from('user_preferences')
      .select('*')
      .eq('user_id', user.id)
      .single();
    if (error && error.code === 'PGRST116') {
      // No preferences yet - create defaults
      return this.create({});
    }
    if (error) throw error;
    return data;
  },

  async create(prefs) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Authentication required');
    const { data, error } = await supabase
      .from('user_preferences')
      .insert({ ...prefs, user_id: user.id })
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async update(updates) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Authentication required');
    const { data, error } = await supabase
      .from('user_preferences')
      .update(updates)
      .eq('user_id', user.id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }
};
