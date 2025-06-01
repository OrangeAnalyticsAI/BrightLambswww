export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          user_type: 'user' | 'contributor' | 'admin'
          created_at: string
          updated_at: string | null
          job_title: string | null
          mailing_list_opt_in: boolean | null
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          user_type?: 'user' | 'contributor' | 'admin'
          created_at?: string
          updated_at?: string | null
          job_title?: string | null
          mailing_list_opt_in?: boolean | null
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          user_type?: 'user' | 'contributor' | 'admin'
          created_at?: string
          updated_at?: string | null
          job_title?: string | null
          mailing_list_opt_in?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
