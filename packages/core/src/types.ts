export interface UserProfile {
  id: string;
  username: string | null;
  avatar_url: string | null;
  xp_total: number;
  current_level: number;
  current_streak: number;
}

export interface Task {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'todo' | 'in_progress' | 'done';
  energy_cost: number;
  due_date: string | null;
  created_at: string;
}

export interface PantryItem {
  id: string;
  user_id: string;
  name: string;
  quantity: number;
  unit: string | null;
  barcode: string | null;
  expiry_date: string | null;
  is_in_shopping_list: boolean;
}

export interface Transaction {
  id: string;
  user_id: string;
  amount: number;
  type: 'income' | 'expense';
  category: string | null;
  date: string;
  receipt_image_url: string | null;
}

export interface FocusSession {
  id: string;
  user_id: string;
  duration_minutes: number;
  completed_at: string;
  focus_rating: number | null;
}
