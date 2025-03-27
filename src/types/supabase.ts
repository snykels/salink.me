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
      links: {
        Row: {
          id: string
          user_id: string
          title: string
          original_url: string
          short_code: string
          description: string | null
          tags: string[] | null
          expires_at: string | null
          is_password_protected: boolean
          is_geo_targeted: boolean
          is_device_targeted: boolean
          is_one_time_use: boolean
          status: string
          button_style: Json | null
          payment_settings: Json | null
          clicks: number
          created_at: string
          updated_at: string
          order: number | null
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          original_url: string
          short_code: string
          description?: string | null
          tags?: string[] | null
          expires_at?: string | null
          is_password_protected?: boolean
          is_geo_targeted?: boolean
          is_device_targeted?: boolean
          is_one_time_use?: boolean
          status?: string
          button_style?: Json | null
          payment_settings?: Json | null
          clicks?: number
          created_at?: string
          updated_at?: string
          order?: number | null
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          original_url?: string
          short_code?: string
          description?: string | null
          tags?: string[] | null
          expires_at?: string | null
          is_password_protected?: boolean
          is_geo_targeted?: boolean
          is_device_targeted?: boolean
          is_one_time_use?: boolean
          status?: string
          button_style?: Json | null
          payment_settings?: Json | null
          clicks?: number
          created_at?: string
          updated_at?: string
          order?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "links_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      link_images: {
        Row: {
          id: string
          link_id: string
          url: string
          type: string
          created_at: string
        }
        Insert: {
          id?: string
          link_id: string
          url: string
          type: string
          created_at?: string
        }
        Update: {
          id?: string
          link_id?: string
          url?: string
          type?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "link_images_link_id_fkey"
            columns: ["link_id"]
            referencedRelation: "links"
            referencedColumns: ["id"]
          }
        ]
      }
      link_clicks: {
        Row: {
          id: string
          link_id: string
          ip_address: string | null
          user_agent: string | null
          referrer: string | null
          country: string | null
          city: string | null
          device_type: string | null
          browser: string | null
          os: string | null
          created_at: string
        }
        Insert: {
          id?: string
          link_id: string
          ip_address?: string | null
          user_agent?: string | null
          referrer?: string | null
          country?: string | null
          city?: string | null
          device_type?: string | null
          browser?: string | null
          os?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          link_id?: string
          ip_address?: string | null
          user_agent?: string | null
          referrer?: string | null
          country?: string | null
          city?: string | null
          device_type?: string | null
          browser?: string | null
          os?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "link_clicks_link_id_fkey"
            columns: ["link_id"]
            referencedRelation: "links"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          id: string
          user_id: string
          username: string | null
          full_name: string | null
          avatar_url: string | null
          website: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          website?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          website?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_user_id_fkey"
            columns: ["user_id"]
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
      get_clicks_by_date_range: {
        Args: {
          link_id: string
          start_date: string
          end_date: string
        }
        Returns: {
          date: string
          count: number
        }[]
      }
      get_clicks_by_country: {
        Args: {
          link_id: string
        }
        Returns: {
          country: string
          count: number
        }[]
      }
      get_clicks_by_device: {
        Args: {
          link_id: string
        }
        Returns: {
          device_type: string
          count: number
        }[]
      }
      get_clicks_by_browser: {
        Args: {
          link_id: string
        }
        Returns: {
          browser: string
          count: number
        }[]
      }
      increment_link_clicks: {
        Args: {
          link_id: string
        }
        Returns: boolean
      }
      update_links_order: {
        Args: {
          links_data: {
            id: string
            order: number
          }[]
        }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
