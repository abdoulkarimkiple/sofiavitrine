export type MenuCategory =
  | "Tout"
  | "Plats"
  | "Beverage";

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  priceLabel?: string;
  category: MenuCategory;
  image: string;
  popular: boolean;
  available: boolean;
  spicyLevel: 0 | 1 | 2 | 3;
  halal: boolean;
  dietaryTags: string[];
  options?: string[];
};

export type CartItem = MenuItem & {
  quantity: number;
};
