export interface GroceryItem {
  id: string;
  name: string;
  note?: string;
  quantity: number;
  is_completed: boolean;
  is_archived: boolean;
  created_at: number;
}

export type SortOption = 'newest' | 'oldest' | 'incomplete_first' | 'alphabetical';
