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
      users: {
        Row: {
          id: string
          role: 'booker' | 'clipper'
          email: string
          username: string
          profile_picture: string | null
          youtube_tokens: Json[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          role: 'booker' | 'clipper'
          email: string
          username: string
          profile_picture?: string | null
          youtube_tokens?: Json[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          role?: 'booker' | 'clipper'
          email?: string
          username?: string
          profile_picture?: string | null
          youtube_tokens?: Json[] | null
          created_at?: string
          updated_at?: string
        }
      }
      projects: {
        Row: {
          id: string
          booker_id: string
          title: string
          description: string
          budget: number
          cpm_rate: number
          status: 'open' | 'in_progress' | 'completed' | 'guaranteed'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          booker_id: string
          title: string
          description: string
          budget: number
          cpm_rate: number
          status?: 'open' | 'in_progress' | 'completed' | 'guaranteed'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          booker_id?: string
          title?: string
          description?: string
          budget?: number
          cpm_rate?: number
          status?: 'open' | 'in_progress' | 'completed' | 'guaranteed'
          created_at?: string
          updated_at?: string
        }
      }
      clips: {
        Row: {
          id: string
          project_id: string
          clipper_id: string
          video_url: string
          portfolio_metrics: Json
          status: 'submitted' | 'approved' | 'rejected'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          project_id: string
          clipper_id: string
          video_url: string
          portfolio_metrics?: Json
          status?: 'submitted' | 'approved' | 'rejected'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          clipper_id?: string
          video_url?: string
          portfolio_metrics?: Json
          status?: 'submitted' | 'approved' | 'rejected'
          created_at?: string
          updated_at?: string
        }
      }
      transactions: {
        Row: {
          id: string
          user_id: string
          project_id: string | null
          amount: number
          transaction_type: 'commission' | 'payment' | 'refund' | 'subscription'
          stripe_transaction_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          project_id?: string | null
          amount: number
          transaction_type: 'commission' | 'payment' | 'refund' | 'subscription'
          stripe_transaction_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          project_id?: string | null
          amount?: number
          transaction_type?: 'commission' | 'payment' | 'refund' | 'subscription'
          stripe_transaction_id?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      analytics: {
        Row: {
          clip_id: string | null
          project_id: string | null
          clipper_id: string | null
          views: string | null
          likes: string | null
          created_at: string | null
          cpm_rate: number | null
          budget: number | null
        }
      }
    }
  }
}