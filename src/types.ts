export type Category = 'All' | 'Personal' | 'Work' | 'Study' | 'Other';

export interface Task {
  id: string;
  title: string;
  description?: string;
  category: Exclude<Category, 'All'>;
  completed: boolean;
  createdAt: string; // ISO
  dueDate?: string; // ISO
}