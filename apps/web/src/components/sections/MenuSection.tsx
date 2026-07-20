import { useEffect, useMemo, useState } from "react";
import { fallbackMenu, fetchPublicMenu } from "../../services/menuApi";
import type { MenuCategory, MenuItem } from "../../types/menu";
import { MenuCard } from "../menu/MenuCard";

type MenuSectionProps = {
  onAdd: (item: MenuItem) => void;
  onOrderNow: (item: MenuItem) => void;
};

export function MenuSection({ onAdd, onOrderNow }: MenuSectionProps) {
  const [category, setCategory] = useState<MenuCategory>("Tout");
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState<MenuCategory[]>(fallbackMenu.categories);
  const [menuItems, setMenuItems] = useState<MenuItem[]>(fallbackMenu.items);

  useEffect(() => {
    let isMounted = true;

    fetchPublicMenu()
      .then((menu) => {
        if (!isMounted) {
          return;
        }

        setCategories(menu.categories);
        setMenuItems(menu.items);
      })
      .catch(() => {
        if (!isMounted) {
          return;
        }

        setCategories(fallbackMenu.categories);
        setMenuItems(fallbackMenu.items);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const filtered = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesCategory = category === "Tout" || item.category === category;
      const matchesSearch = `${item.name} ${item.description}`.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [category, search]);

  return (
    <section id="menu" className="section bg-sofia-charcoal">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="eyebrow">Menu complet</p>
          <h2 className="section-title">Les spécialités ouest-africaines</h2>
          <p className="section-copy">Choisissez vos plats, ajoutez-les au panier, puis envoyez votre commande sur WhatsApp pour confirmer la disponibilité, la livraison et le total final.</p>
        </div>
        <div className="mb-6 flex gap-3 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`shrink-0 rounded-md border px-4 py-2 text-sm font-bold transition ${category === cat ? "border-sofia-gold bg-sofia-gold text-black" : "border-white/10 text-sofia-cream hover:border-sofia-gold/60"}`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="mb-8 rounded-lg border border-white/10 bg-black/30 p-4">
          <label className="relative block">
            <span className="sr-only">Rechercher dans le menu</span>
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Rechercher un plat..." className="w-full rounded-md border border-white/10 bg-black/40 px-4 py-3 text-sofia-cream outline-none focus:border-sofia-gold" />
          </label>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => <MenuCard key={item.id} item={item} onAdd={onAdd} onOrderNow={onOrderNow} />)}
        </div>
      </div>
    </section>
  );
}
