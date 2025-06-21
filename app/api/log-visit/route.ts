import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { Database } from '@/types/supabase';

// A simple regex to detect common bots and crawlers
const BOT_UA_PATTERNS = /bot|crawl|spider|slurp|bingbot|googlebot|yahoo|duckduckbot/i;

// Helper function to safely log environment variables
function logEnvironment() {
  console.log('Environment variables:', {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL 
      ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}` 
      : 'Not set',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY 
      ? `Set (length: ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.length})` 
      : 'Not set',
    // Log all environment variables for debugging
    ALL_VARS: Object.keys(process.env).filter(key => 
      key.includes('SUPABASE') || 
      key.includes('NEXT_PUBLIC') ||
      key === 'NODE_ENV'
    ).reduce((acc, key) => ({
      ...acc,
      [key]: key.includes('KEY') || key.includes('SECRET') 
        ? `${process.env[key]?.substring(0, 5)}...` 
        : process.env[key]
    }), {})
  });
}

export async function POST(req: NextRequest) {
  console.log('=== /api/log-visit called ===');
  logEnvironment();
  
  // Log request headers for debugging
  console.log('Request headers:', Object.fromEntries(req.headers.entries()));
  
  try {
    // Log environment variables (safely)
    console.log('Env check - NEXT_PUBLIC_SUPABASE_URL:', 
      process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Set' : 'Not set');
    
    const userAgent = req.headers.get('user-agent');
    console.log('User-Agent:', userAgent || 'Not provided');

    // 1. Bot detection: If it's a bot or there's no user agent, ignore the request.
    if (!userAgent || BOT_UA_PATTERNS.test(userAgent)) {
      console.log('Request ignored - bot detected or no user agent');
      return NextResponse.json({ message: 'Request ignored' }, { status: 200 });
    }

    // Parse the request body
    let path: string;
    try {
      const body = await req.json();
      path = body.path;
      console.log('Path from request:', path);
    } catch (e) {
      console.error('Error parsing request body:', e);
      return NextResponse.json(
        { error: 'Invalid request body' }, 
        { status: 400 }
      );
    }

    // 2. Anonymize IP for GDPR compliance
    const ip = req.ip ? req.ip.split('.').slice(0, -1).join('.') + '.0' : null;
    console.log('Anonymized IP:', ip);

    // Log environment variables (safely)
    console.log('Environment variables:', {
      NODE_ENV: process.env.NODE_ENV,
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY 
        ? `${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.substring(0, 10)}...`
        : 'Not set'
    });
    
    // Initialize Supabase client
    console.log('Creating Supabase client...');
    let supabase;
    try {
      // Create Supabase client with explicit configuration
      const cookieStore = cookies();
      
      // First, check RLS policies with the anon key
      console.log('Creating Supabase client with anon key...');
      supabase = createServerClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          auth: {
            persistSession: false,
            autoRefreshToken: false,
            detectSessionInUrl: false
          },
          cookies: {
            get(name: string) {
              return cookieStore.get(name)?.value;
            },
            set(name: string, value: string, options: any) {
              cookieStore.set({ name, value, ...options });
            },
            remove(name: string, options: any) {
              cookieStore.set({ name, value: '', ...options });
            },
          },
        }
      );
      
      // Check RLS policies
      console.log('Checking RLS policies...');
      const { data: rlsData, error: rlsError } = await supabase
        .rpc('show_all_policies', { schema_name: 'public', table_name: 'visits' });
        
      if (rlsError) {
        console.warn('Could not fetch RLS policies:', rlsError);
      } else {
        console.log('Current RLS policies for visits table:', rlsData);
      }
      
      console.log('Supabase client created successfully');
      
      // Test the connection with a simple query
      console.log('Testing Supabase connection with anon key...');
      const { data, error } = await supabase
        .from('visits')
        .select('*')
        .limit(1);
        
      if (error) {
        console.error('Supabase query test with anon key failed:', error);
        
        // Try with service role key if available
        if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
          console.log('Trying with service role key...');
          const serviceRoleClient = createServerClient<Database>(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!,
            {
              auth: {
                persistSession: false,
                autoRefreshToken: false,
                detectSessionInUrl: false
              },
              cookies: {
                get(name: string) {
                  return cookieStore.get(name)?.value;
                },
                set(name: string, value: string, options: any) {
                  cookieStore.set({ name, value, ...options });
                },
                remove(name: string, options: any) {
                  cookieStore.set({ name, value: '', ...options });
                },
              },
            }
          );
          
          const { data: serviceData, error: serviceError } = await serviceRoleClient
            .from('visits')
            .select('*')
            .limit(1);
            
          if (serviceError) {
            console.error('Supabase query test with service role key also failed:', serviceError);
          } else {
            console.log('Supabase connection with service role key successful. Table data:', serviceData);
            console.log('This suggests RLS is blocking the anon user. Please check your RLS policies.');
          }
        }
        
        throw error;
      }
      console.log('Supabase connection test successful. Table data:', data);
      
    } catch (e) {
      const error = e as Error & { code?: string; hint?: string; details?: string };
      console.error('Failed to create or test Supabase client:', {
        message: error.message,
        code: error.code,
        hint: error.hint,
        details: error.details,
        stack: error.stack
      });
      
      return new Response(
        JSON.stringify({
          error: 'Failed to initialize database client',
          message: error.message,
          code: error.code,
          hint: error.hint,
          details: error.details
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
    
    // 3. Insert the visit into the database
    console.log('Attempting to insert visit record...', {
      path,
      anonymised_ip: ip,
      user_agent: userAgent,
    });

    try {
      // First, try the standard insert
      console.log('Trying standard insert...');
      const { data: insertData, error: insertError } = await supabase
        .from('visits')
        .insert({
          path: path,
          anonymised_ip: ip,
          user_agent: userAgent,
        })
        .select();

      if (insertError) {
        console.error('Standard insert failed, trying raw SQL...', insertError);
        
        // Try with raw SQL as fallback
        const { data: rawData, error: rawError } = await supabase.rpc('insert_visit', {
          p_path: path,
          p_anonymised_ip: ip,
          p_user_agent: userAgent,
        });

        if (rawError) {
          console.error('Raw SQL insert also failed:', rawError);
          throw new Error(`Both insert methods failed. Standard: ${insertError.message} | Raw SQL: ${rawError.message}`);
        }

        
        console.log('Raw SQL insert successful');
        return NextResponse.json({ success: true, data: rawData });
      }
      
      console.log('Standard insert successful');
      return NextResponse.json({ success: true, data: insertData });
      
    } catch (error) {
      console.error('Error in visit insertion:', error);
      
      const errorDetails = error instanceof Error ? {
        message: error.message,
        name: error.name,
        stack: error.stack,
      } : String(error);

      return NextResponse.json(
        { 
          error: 'Failed to log visit', 
          details: errorDetails,
          message: error instanceof Error ? error.message : 'Unknown error occurred'
        },
        { status: 500 }
      );
    }
    
  } catch (e) {
    console.error('Unexpected error in /api/log-visit:', e);
    return NextResponse.json(
      { 
        error: 'Internal Server Error', 
        details: e instanceof Error ? e.message : String(e),
        stack: e instanceof Error ? e.stack : undefined
      },
      { status: 500 }
    );
  }
}
