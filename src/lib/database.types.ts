export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      _prisma_migrations: {
        Row: {
          applied_steps_count: number
          checksum: string
          finished_at: string | null
          id: string
          logs: string | null
          migration_name: string
          rolled_back_at: string | null
          started_at: string
        }
        Insert: {
          applied_steps_count?: number
          checksum: string
          finished_at?: string | null
          id: string
          logs?: string | null
          migration_name: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Update: {
          applied_steps_count?: number
          checksum?: string
          finished_at?: string | null
          id?: string
          logs?: string | null
          migration_name?: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Relationships: []
      }
      Customer: {
        Row: {
          email: string
          id: string
          image_url: string | null
          name: string
        }
        Insert: {
          email: string
          id: string
          image_url?: string | null
          name: string
        }
        Update: {
          email?: string
          id?: string
          image_url?: string | null
          name?: string
        }
        Relationships: []
      }
      Invoice: {
        Row: {
          amount: number
          customer_id: string | null
          date: string
          id: string
          status: Database["public"]["Enums"]["InvoiceStatus"]
        }
        Insert: {
          amount: number
          customer_id?: string | null
          date: string
          id: string
          status?: Database["public"]["Enums"]["InvoiceStatus"]
        }
        Update: {
          amount?: number
          customer_id?: string | null
          date?: string
          id?: string
          status?: Database["public"]["Enums"]["InvoiceStatus"]
        }
        Relationships: [
          {
            foreignKeyName: "Invoice_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "Customer"
            referencedColumns: ["id"]
          },
        ]
      }
      Profile: {
        Row: {
          bio: string | null
          birthdate: string | null
          id: string
          image_url: string | null
          sex: Database["public"]["Enums"]["Sex"] | null
          user_id: string
        }
        Insert: {
          bio?: string | null
          birthdate?: string | null
          id?: string
          image_url?: string | null
          sex?: Database["public"]["Enums"]["Sex"] | null
          user_id: string
        }
        Update: {
          bio?: string | null
          birthdate?: string | null
          id?: string
          image_url?: string | null
          sex?: Database["public"]["Enums"]["Sex"] | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "Profile_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
        ]
      }
      Revenue: {
        Row: {
          id: string
          month: string
          revenue: number
        }
        Insert: {
          id: string
          month: string
          revenue: number
        }
        Update: {
          id?: string
          month?: string
          revenue?: number
        }
        Relationships: []
      }
      User: {
        Row: {
          email: string
          id: string
          name: string | null
          role: Database["public"]["Enums"]["Role"]
        }
        Insert: {
          email: string
          id: string
          name?: string | null
          role?: Database["public"]["Enums"]["Role"]
        }
        Update: {
          email?: string
          id?: string
          name?: string | null
          role?: Database["public"]["Enums"]["Role"]
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      InvoiceStatus: "paid" | "pending" | "canceled"
      Role: "user" | "admin"
      Sex: "male" | "female" | "other"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
