import { useEffect, useMemo, useState } from "react";
import type { CartItem, MenuItem } from "../types/menu";
import { loadFromStorage, saveToStorage } from "../utils/localStorage";

const CART_KEY = "african-restaurant-sofia-cart";

export function useCart() {
  const [items, setItems] = useState<CartItem[]>(() => loadFromStorage<CartItem[]>(CART_KEY, []));

  useEffect(() => {
    saveToStorage(CART_KEY, items);
  }, [items]);

  const subtotal = useMemo(() => items.reduce((sum, item) => sum + item.price * item.quantity, 0), [items]);
  const count = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);

  const addItem = (menuItem: MenuItem) => {
    setItems((current) => {
      const existing = current.find((item) => item.id === menuItem.id);
      if (existing) {
        return current.map((item) =>
          item.id === menuItem.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return [...current, { ...menuItem, quantity: 1 }];
    });
  };

  const removeItem = (id: string) => setItems((current) => current.filter((item) => item.id !== id));
  const clearCart = () => setItems([]);
  const increase = (id: string) =>
    setItems((current) => current.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item)));
  const decrease = (id: string) =>
    setItems((current) =>
      current
        .map((item) => (item.id === id ? { ...item, quantity: Math.max(0, item.quantity - 1) } : item))
        .filter((item) => item.quantity > 0),
    );

  return { items, subtotal, count, addItem, removeItem, clearCart, increase, decrease };
}
