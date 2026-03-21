import { supabase } from '../supabaseClient';

function parseSortField(sortField) {
  if (!sortField) return { column: 'created_date', ascending: false };
  const ascending = !sortField.startsWith('-');
  const column = sortField.replace(/^-/, '');
  return { column, ascending };
}

export const UserStory = {
  async list(sortField, limit) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Authentication required');
    const { column, ascending } = parseSortField(sortField);
    let query = supabase.from('user_stories').select('*').eq('user_id', user.id).order(column, { ascending });
    if (limit) query = query.limit(limit);
    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  async get(id) {
    const { data, error } = await supabase.from('user_stories').select('*').eq('id', id).single();
    if (error) throw error;
    return data;
  },

  async filter(filters, sortField) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Authentication required');
    const { column, ascending } = parseSortField(sortField);
    let query = supabase.from('user_stories').select('*').eq('user_id', user.id);
    Object.entries(filters).forEach(([key, value]) => {
      query = query.eq(key, value);
    });
    query = query.order(column, { ascending });
    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  async create(storyData) {
    const { data: { user } } = await supabase.auth.getUser();
    const { data, error } = await supabase.from('user_stories').insert({ ...storyData, user_id: user.id }).select().single();
    if (error) throw error;
    return data;
  },

  async update(id, updates) {
    const { data, error } = await supabase.from('user_stories').update(updates).eq('id', id).select().single();
    if (error) throw error;
    return data;
  },

  async delete(id) {
    const { error } = await supabase.from('user_stories').delete().eq('id', id);
    if (error) throw error;
  }
};
