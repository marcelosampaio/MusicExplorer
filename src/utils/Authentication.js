import supabase from "../services/SupabaseClient";

const Authentication = {
  login: async (email, password) => {
    console.log("Chamando supabase.auth.signInWithPassword...");
    return await supabase.auth.signInWithPassword({
      email,
      password,
    });
  },

  register: async (email, password) => {
    console.log("Chamando supabase.auth.signUp...");
    return await supabase.auth.signUp({
      email,
      password,
    });
  },

  logout: async () => {
    console.log("Chamando supabase.auth.signOut...");
    return await supabase.auth.signOut();
  },
};

export default Authentication;
