export type ListingCategory =
  | "Playa"
  | "Mansiones"
  | "Tendencias"
  | "Vistas increíbles"
  | "Cabañas"
  | "Piscinas"
  | "Frente al mar"
  | "Casas rurales";

export type Listing = {
  id: string;
  title: string;
  location: string;
  nightlyPrice: number;
  rating: number;
  category: ListingCategory;
  photoTone: "ocean" | "rose" | "forest" | "sand" | "lavender" | "sky";
};
