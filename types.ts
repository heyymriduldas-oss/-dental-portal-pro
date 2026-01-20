
import React from 'react';

export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  icon: React.ReactNode;
  image: string;
  benefits: string[];
}

export interface Review {
  id: number;
  author: string;
  role: string;
  rating: number;
  comment: string;
  avatar: string;
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
}

export type AppointmentStatus = 'Confirmed' | 'Pending' | 'Cancelled';

export interface Appointment {
  id: number;
  patient: string;
  phone: string;
  type: string;
  time: string;
  status: AppointmentStatus;
  doctor: string;
}
