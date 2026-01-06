export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  image: string;
  priceStart: string;
}

export interface GalleryItem {
  id: string;
  url: string;
  category: string;
  title: string;
}

export interface BookingDetails {
  name: string;
  phone: string;
  date: string;
  time: string;
  service: string;
}

export enum AnimationState {
  HIDDEN = 'opacity-0 translate-y-8',
  VISIBLE = 'opacity-100 translate-y-0',
}