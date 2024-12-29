export interface PopularCardProps {
  id: number;
  index: number;
  image: string;
  title: string;
  genres: string[];
  views: number;
  rating: number;
}

export interface Chapter {
  _id?: number;
  title: string;
  content?: string;
  createdAt: Date;
  updatedAt?: Date;
  isPremium: boolean;
  price?: number;
}

export interface Comment {
  _id?: number;
  content: string;
  userId: User;
  likes: string[];
  dislikes: string[];
  createdAt?: Date;
  replies?: Comment[];
}

export interface User {
  _id?: number;
  name: string;
  email: string;
}

export interface Series {
  _id: string;
  name: string;
  description: string;
  translator: string;
  genres?: string[];
  tags?: string[];
  thumbnail: string;
  images?: string[];
  views?: number;
  ratings?: number;
  schedule?: string[];
  type?: string;
  status?: string;
  paymentType?: string;
  tiers?: any[];
  createdAt: string;
  updatedAt: string;
}

export type Refetch = () => Promise<any>;
