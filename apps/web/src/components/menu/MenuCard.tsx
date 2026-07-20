import { Leaf, Plus, Send } from "lucide-react";
import type { MenuItem } from "../../types/menu";
import { formatCurrency } from "../../utils/currency";
import { Button } from "../ui/Button";

type MenuCardProps = {
  item: MenuItem;
  onAdd: (item: MenuItem) => void;
  onOrderNow: (item: MenuItem) => void;
};

export function MenuCard({ item, onAdd, onOrderNow }: MenuCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-sofia-gold/18 bg-sofia-surface shadow-gold transition hover:-translate-y-1 hover:border-sofia-gold/55">
      <div className="relative aspect-[4/3] overflow-hidden bg-sofia-charcoal">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          onError={(event) => {
            event.currentTarget.src = "/src/assets/branding/african-restaurant-sofia-business-card.jpeg";
          }}
        />
        <div className="absolute left-3 top-3 rounded-full bg-black/75 px-3 py-1 text-xs font-bold text-sofia-gold">Halal</div>
        <div className="absolute right-3 top-3 rounded-full bg-sofia-gold px-3 py-1 text-sm font-black text-black">{item.priceLabel ?? formatCurrency(item.price)}</div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-start justify-between gap-3">
          <h3 className="font-display text-xl font-bold text-sofia-cream">{item.name}</h3>
          {item.dietaryTags.includes("Végétarien") && <Leaf className="mt-1 shrink-0 text-green-400" size={18} aria-label="Végétarien" />}
        </div>
        <p className="mb-4 flex-1 text-sm leading-6 text-sofia-muted">{item.description}</p>
        <div className="mb-4 flex flex-wrap items-center gap-2 text-xs text-sofia-muted">
          <span className="rounded-full border border-white/10 px-3 py-1">{item.available ? "Disponible" : "Indisponible"}</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Button onClick={() => onAdd(item)} disabled={!item.available} className="px-3">
            <Plus size={16} /> Ajouter
          </Button>
          <Button variant="secondary" onClick={() => onOrderNow(item)} disabled={!item.available} className="px-3">
            <Send size={16} /> Commander
          </Button>
        </div>
      </div>
    </article>
  );
}
