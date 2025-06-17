// This file contains type declarations for your project.
// It allows you to type-check your code and get better IDE support.

// Type definitions for your application
declare module '@/types/supabase' {
  export interface Database {
    public: {
      Tables: {
        profiles: {
          Row: {
            id: string;
            email: string;
            full_name: string | null;
            avatar_url: string | null;
            created_at: string;
            updated_at: string | null;
          };
          Insert: {
            id?: string;
            email: string;
            full_name?: string | null;
            avatar_url?: string | null;
            created_at?: string;
            updated_at?: string | null;
          };
          Update: {
            id?: string;
            email?: string;
            full_name?: string | null;
            avatar_url?: string | null;
            created_at?: string;
            updated_at?: string | null;
          };
        };
      };
    };
  }
}

// Add other type declarations as needed
