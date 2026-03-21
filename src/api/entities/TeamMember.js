import { supabase } from '../supabaseClient';

async function getAuthUser() {
  const { data: { session } } = await supabase.auth.getSession();
  return session?.user || null;
}

export const TeamMember = {
  async listByBoard(boardId) {
    const { data, error } = await supabase
      .from('team_members')
      .select('*, profiles:user_id(id, full_name, email, avatar, role)')
      .eq('board_id', boardId)
      .order('created_date', { ascending: true });
    if (error) throw error;
    return data;
  },

  async add(boardId, userId, role = 'editor') {
    const user = await getAuthUser();
    const { data, error } = await supabase
      .from('team_members')
      .insert({ board_id: boardId, user_id: userId, role, invited_by: user.id })
      .select('*, profiles:user_id(id, full_name, email, avatar, role)')
      .single();
    if (error) throw error;
    return data;
  },

  async updateRole(id, role) {
    const { data, error } = await supabase
      .from('team_members')
      .update({ role })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async remove(id) {
    const { error } = await supabase.from('team_members').delete().eq('id', id);
    if (error) throw error;
  }
};
