import { ServiceItem, GalleryItem } from './types';

export const SALON_INFO = {
  name: "Payal's Elegance Beauty Salon",
  phone: "7016924791",
  instagram: "elegancebeautysalon95",
  address: "177 Jay Ambe Nagar, Ajwa Rd, Bahar Colony, Vadodara, Gujarat 390019",
  timings: "10:00 AM - 7:00 PM"
};

export const SERVICES: ServiceItem[] = [
  {
    id: 'hair',
    title: 'Hair Styling',
    description: 'Expert cuts, coloring, rebonding, and bridal hairstyles.',
    image: 'https://images.unsplash.com/photo-1629397683830-9805395892e8?q=80&w=800&auto=format&fit=crop',
    priceStart: '₹500'
  },
  {
    id: 'makeup',
    title: 'Bridal Makeup',
    description: 'HD, Airbrush, and traditional Indian bridal makeup.',
    image: 'https://images.unsplash.com/photo-1714381107967-fec1f4adfaa2?q=80&w=800&auto=format&fit=crop',
    priceStart: '₹5000'
  },
  {
    id: 'skin',
    title: 'Skin Care',
    description: 'Facials, bleaching, waxing, and pre-bridal packages.',
    image: 'https://plus.unsplash.com/premium_photo-1661405696739-b938b2a58996?q=80&w=800&auto=format&fit=crop',
    priceStart: '₹800'
  },
  {
    id: 'nails',
    title: 'Nail Artistry',
    description: 'Gel extensions, acrylics, and custom bridal nail art.',
    image: 'https://images.unsplash.com/photo-1690749138086-7422f71dc159?q=80&w=800&auto=format&fit=crop',
    priceStart: '₹1200'
  }
];

// Authentic Indian Wedding/Style Images
export const GALLERY_IMAGES: GalleryItem[] = [
  { 
    id: '1', 
    url: 'https://images.unsplash.com/photo-1737515031439-2998a5bfcb6f?q=80&w=600&auto=format&fit=crop', 
    category: 'Bridal', 
    title: 'Royal Bridal Look' 
  },
  { 
    id: '2', 
    url: 'https://images.unsplash.com/photo-1684868265714-fd2300637c23?q=80&w=600&auto=format&fit=crop', 
    category: 'Makeup', 
    title: 'Golden Glow' 
  },
  { 
    id: '3', 
    url: 'https://images.unsplash.com/photo-1757598147818-a8237ae46fdc?q=80&w=600&auto=format&fit=crop', 
    category: 'Hair', 
    title: 'Traditional Jewels' 
  },
  { 
    id: '4', 
    url: 'https://images.unsplash.com/photo-1760613129745-418b15f91d56?q=80&w=600&auto=format&fit=crop', 
    category: 'Mehendi', 
    title: 'Intricate Henna' 
  },
];