
import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dzhlvcxysthjyckjjxjd.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR6aGx2Y3h5c3Roanlja2pqeGpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM3MTYwNDgsImV4cCI6MjA3OTI5MjA0OH0.9KuSGuzrcVuf0P3HrzjItuNDUKFSNnQf0FpPpl9G6W8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
