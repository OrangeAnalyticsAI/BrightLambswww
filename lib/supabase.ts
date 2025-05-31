import { createClient } from '@supabase/supabase-js'

// Hardcoded values for testing
const supabaseUrl = 'https://sxsfevfkplihdxzeoecp.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN4c2ZldmZrcGxpaGR4emVvZWNwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg2MTkwMDgsImV4cCI6MjA2NDE5NTAwOH0._sRyfTjvX2vNy58L3Vi3_YK02j4CDGniU-GMRITkv4s'

console.log('Using hardcoded Supabase configuration')

export const supabase = createClient(supabaseUrl, supabaseKey)
