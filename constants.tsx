
import React from 'react';
import { 
  Stethoscope, 
  ShieldCheck, 
  Sparkles, 
  Smile, 
  Activity, 
  Clock, 
  MapPin, 
  Phone, 
  Mail 
} from 'lucide-react';
import { Service, Review, BlogPost } from './types';

export const SERVICES: Service[] = [
  {
    id: 'cosmetic',
    title: 'Cosmetic Dentistry',
    shortDescription: 'Transform your smile with veneers, whitening, and bonding.',
    fullDescription: 'Our cosmetic dentistry services are designed to enhance your natural beauty. Whether you need professional teeth whitening, porcelain veneers, or composite bonding, we use the latest technology to create the smile you’ve always wanted.',
    icon: <Sparkles className="w-6 h-6" />,
    image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=800',
    benefits: ['Natural looking results', 'Minimally invasive options', 'Long-lasting whitening', 'Personalized treatment plans']
  },
  {
    id: 'orthodontics',
    title: 'Orthodontics',
    shortDescription: 'Modern clear aligners and braces for all ages.',
    fullDescription: 'Straighten your teeth comfortably with our range of orthodontic solutions. We offer Invisalign clear aligners as well as traditional braces, tailored to fit your lifestyle and clinical needs.',
    icon: <ShieldCheck className="w-6 h-6" />,
    image: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=800',
    benefits: ['Clear aligner technology', 'Comfortable fitting', 'Digital planning', 'Options for kids and adults']
  },
  {
    id: 'pediatric',
    title: 'Pediatric Dentistry',
    shortDescription: 'Gentle care for your little ones in a fun environment.',
    fullDescription: 'We believe in making dental visits fun and educational for children. Our gentle approach ensures a positive experience, setting the foundation for a lifetime of healthy smiles.',
    icon: <Smile className="w-6 h-6" />,
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800',
    benefits: ['Kid-friendly atmosphere', 'Prevention-focused care', 'Parental education', 'Gentle behavioral management']
  },
  {
    id: 'implants',
    title: 'Dental Implants',
    shortDescription: 'Permanent solutions for missing teeth.',
    fullDescription: 'Restore the function and aesthetics of your mouth with high-quality dental implants. Our surgeons specialize in durable, natural-looking tooth replacements.',
    icon: <Stethoscope className="w-6 h-6" />,
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800',
    benefits: ['Permanent restoration', 'Prevents bone loss', 'Natural feel and function', '98% success rate']
  }
];

export const REVIEWS: Review[] = [
  {
    id: 1,
    author: "Sarah Johnson",
    role: "Mother & Local Resident",
    rating: 5,
    comment: "The staff here is incredible. They made my 5-year-old feel so comfortable during his first cleaning. Highly recommended for families!",
    avatar: "https://i.pravatar.cc/150?u=sarah"
  },
  {
    id: 2,
    author: "Mark Thompson",
    role: "Corporate Professional",
    rating: 5,
    comment: "Quick, efficient, and very professional. The clinic is spotless and modern. I appreciate the early morning appointment slots.",
    avatar: "https://i.pravatar.cc/150?u=mark"
  },
  {
    id: 3,
    author: "Elena Rodriguez",
    role: "Cosmetic Patient",
    rating: 5,
    comment: "The veneers I received have changed my life. Dr. Smith is a true artist. Worth every penny for the quality of care provided.",
    avatar: "https://i.pravatar.cc/150?u=elena"
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: "5 Tips for Maintaining Your Teeth Whitening Results",
    excerpt: "You've just had your teeth whitened. Now, how do you keep them bright? Learn about the best practices to avoid staining.",
    date: "March 15, 2024",
    category: "Oral Care",
    image: "https://images.unsplash.com/photo-1593054981440-e187740e241c?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 2,
    title: "The Importance of Early Orthodontic Screenings",
    excerpt: "Why age 7 is the ideal time for your child's first orthodontic evaluation and what we look for.",
    date: "March 10, 2024",
    category: "Pediatric",
    image: "https://images.unsplash.com/photo-1445527815219-ecbfec67492e?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 3,
    title: "Understanding Modern Dental Implants",
    excerpt: "A deep dive into why dental implants are considered the gold standard for tooth replacement in 2024.",
    date: "March 2, 2024",
    category: "Restorative",
    image: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=600"
  }
];

export const CLINIC_INFO = {
  phone: "+1 (555) 123-4567",
  email: "care@luminadental.com",
  address: "123 Medical Plaza, Suite 400, New York, NY 10001",
  hours: [
    { day: "Monday - Friday", time: "8:00 AM - 7:00 PM" },
    { day: "Saturday", time: "9:00 AM - 4:00 PM" },
    { day: "Sunday", time: "Emergency Only" }
  ]
};
