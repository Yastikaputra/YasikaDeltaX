import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://amjugpsqtgpahakeavsv.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFtanVncHNxdGdwYWhha2VhdnN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU1MTY0MjIsImV4cCI6MjA5MTA5MjQyMn0.V-NC21a9Ok27xOgC-WHFwT2riQw7X9wT5b2IMdsAIUI";

export const supabase = createClient(supabaseUrl, supabaseKey);
