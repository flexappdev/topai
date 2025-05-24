
export interface ListItem {
  id: string;
  name: string;
  rank: number;
  tagline: string;
  description: string;
  image: string;
  tags: string[];
}

export interface TopList {
  id: string;
  name: string;
  rank: number;
  tagline: string;
  description: string;
  image: string;
  tags: string[];
  items: ListItem[];
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

export type ViewMode = 'tiles' | 'table' | 'scroll';
export type SortBy = 'rank' | 'name' | 'created' | 'updated';
export type UserRole = 'user' | 'editor' | 'admin';
