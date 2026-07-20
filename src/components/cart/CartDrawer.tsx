import { Minus, Plus, Trash2, X } from "lucide-react";
import type { CartItem } from "../../types/menu";
import { formatCurrency } from "../../utils/currency";
import { Button } from "../ui/Button";

type CartDrawerProps = {
  open: boolean;
  items: CartItem[];
  subtotal: number;
  onClose: () => void;
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
  onRemove: (id: string) => void;
  onClear: () => void;
  onCheckout: () => void;
};

export function CartDrawer({ open, items, subtotal, onClose, onIncrease, onDecrease, onRemove, onClear, onCheckout }: CartDrawerProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70" onClick={onClose}>
      <aside className="ml-auto flex h-full w-[94vw] max-w-md flex-col border-l border-sofia-gold/30 bg-sofia-charcoal text-sofia-cream shadow-2xl" onClick={(event) => event.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-white/10 p-5">
          <h2 className="font-display text-2xl font-bold">Votre panier</h2>
          <button aria-label="Fermer le panier" onClick={onClose} className="rounded-md p-2 hover:bg-white/10"><X /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-5">
          {items.length === 0 ? (
            <p className="text-sofia-muted">Votre panier est vide. Ajoutez un plat depuis le menu pour commencer une commande.</p>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="grid grid-cols-[72px_1fr] gap-4 rounded-lg border border-white/10 bg-black/25 p-3">
                  <img src={item.image} alt={item.name} className="h-20 w-20 rounded-md object-cover" />
                  <div>
                    <div className="flex justify-between gap-3">
                      <h3 className="font-bold">{item.name}</h3>
                      <button aria-label={`Retirer ${item.name}`} onClick={() => onRemove(item.id)} className="text-sofia-muted hover:text-red-300"><Trash2 size={17} /></button>
                    </div>
                    <p className="mt-1 text-sm text-sofia-gold">{formatCurrency(item.price * item.quantity)}</p>
                    <div className="mt-3 flex items-center gap-2">
                      <button aria-label={`Diminuer la quantité de ${item.name}`} onClick={() => onDecrease(item.id)} className="rounded-md border border-white/10 p-2"><Minus size={14} /></button>
                      <span className="min-w-8 text-center font-bold">{item.quantity}</span>
                      <button aria-label={`Augmenter la quantité de ${item.name}`} onClick={() => onIncrease(item.id)} className="rounded-md border border-white/10 p-2"><Plus size={14} /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="border-t border-white/10 p-5">
          <div className="mb-4 flex justify-between text-lg font-bold">
            <span>Sous-total</span>
            <span className="text-sofia-gold">{formatCurrency(subtotal)}</span>
          </div>
          <p className="mb-4 text-sm leading-6 text-sofia-muted">Votre commande est confirmée uniquement après la réponse d'African Restaurant Sofia sur WhatsApp.</p>
          <div className="grid gap-3">
            <Button onClick={onCheckout} disabled={items.length === 0}>Commander sur WhatsApp</Button>
            <Button variant="secondary" onClick={onClear} disabled={items.length === 0}>Vider le panier</Button>
          </div>
        </div>
      </aside>
    </div>
  );
}
