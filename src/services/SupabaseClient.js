import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://dgiyqguiycaixnilwams.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRnaXlxZ3VpeWNhaXhuaWx3YW1zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA1MTQ4ODcsImV4cCI6MjA3NjA5MDg4N30.cMABTOJ8E2hDWEVbZ_HPYtxN_XUDy3deTAhcPGcF-C0";

const supabase = createClient(supabaseUrl, supabaseKey);

console.log("Supabase client inicializado:", { supabaseUrl, supabaseKey });

export default supabase;
