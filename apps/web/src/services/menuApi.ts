import { categories as fallbackCategories, menuItems as fallbackMenuItems } from "../data/menu";
import type { MenuCategory, MenuItem } from "../types/menu";

type ApiMenuItem = Omit<MenuItem, "image" | "category" | "spicyLevel" | "dietaryTags"> & {
  image?: string | null;
  category: string;
  spicyLevel?: MenuItem["spicyLevel"];
  dietaryTags?: string[];
};

type ApiMenuResponse = {
  categories: string[];
  items: ApiMenuItem[];
};

const apiBaseUrl = import.meta.env.VITE_API_URL ?? "http://localhost:3000/api";
const fallbackById = new Map(fallbackMenuItems.map((item) => [item.id, item]));

export async function fetchPublicMenu(): Promise<{
  categories: MenuCategory[];
  items: MenuItem[];
}> {
  const response = await fetch(`${apiBaseUrl}/menu`);

  if (!response.ok) {
    throw new Error(`Menu API request failed with ${response.status}`);
  }

  const data = (await response.json()) as ApiMenuResponse;

  return {
    categories: data.categories.length > 0 ? (data.categories as MenuCategory[]) : fallbackCategories,
    items: data.items.map((item) => {
      const fallback = fallbackById.get(item.id);

      return {
        ...item,
        category: item.category as MenuCategory,
        image: item.image ?? fallback?.image ?? "",
        spicyLevel: item.spicyLevel ?? fallback?.spicyLevel ?? 1,
        dietaryTags: item.dietaryTags ?? fallback?.dietaryTags ?? ["Halal"],
        halal: item.halal ?? true,
        popular: item.popular ?? false,
        available: item.available ?? true,
      };
    }),
  };
}

export const fallbackMenu = {
  categories: fallbackCategories,
  items: fallbackMenuItems,
};
