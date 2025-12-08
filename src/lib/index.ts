// place files you want to import through the `$lib` alias in this folder.

import { supabase } from './supabaseClient';

// supabase functions
export const getUser = await supabase?.auth?.getUser();
