import { Menu, ShoppingBag, X } from "lucide-react";
import { useEffect, useState } from "react";
import logo from "../../assets/branding/african-restaurant-sofia-logo.jpeg";
import { businessConfig } from "../../config/business";
import { Button } from "../ui/Button";

type HeaderProps = {
  cartCount: number;
  onCartOpen: () => void;
};

const nav = [
  ["Accueil", "#home"],
  ["Menu", "#menu"],
  ["À propos", "#about"],
  ["Traiteur", "#catering"],
  ["Contact", "#contact"],
];

export function Header({ cartCount, onCartOpen }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-40 transition ${scrolled ? "border-b border-sofia-gold/20 bg-black/85 shadow-2xl backdrop-blur" : "bg-black/20"}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        <a href="#home" className="flex items-center gap-3">
          <img src={logo} alt={`${businessConfig.name} logo`} className="h-14 w-14 rounded-full object-cover ring-1 ring-sofia-gold/50" />
          <span className="hidden font-display text-lg font-bold uppercase tracking-[0.16em] text-sofia-cream sm:block">
            African Restaurant Sofia
          </span>
        </a>
        <nav className="hidden items-center gap-7 lg:flex">
          {nav.map(([label, href]) => (
            <a key={href} href={href} className="text-sm font-semibold text-sofia-cream/85 transition hover:text-sofia-gold">
              {label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <a href={`https://wa.me/${businessConfig.whatsappNumber}`} target="_blank" rel="noreferrer">
            <Button>Commander sur WhatsApp</Button>
          </a>
          <CartButton cartCount={cartCount} onCartOpen={onCartOpen} />
        </div>
        <div className="flex items-center gap-2 lg:hidden">
          <CartButton cartCount={cartCount} onCartOpen={onCartOpen} />
          <button aria-label="Ouvrir la navigation" onClick={() => setOpen(true)} className="rounded-md border border-sofia-gold/30 p-3 text-sofia-cream">
            <Menu size={22} />
          </button>
        </div>
      </div>
      {open && (
        <div className="fixed inset-0 z-50 bg-black/70 lg:hidden" onClick={() => setOpen(false)}>
          <div className="ml-auto flex h-full w-[86vw] max-w-sm flex-col gap-6 border-l border-sofia-gold/30 bg-sofia-charcoal p-5" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-center justify-between">
              <img src={logo} alt={`${businessConfig.name} logo`} className="h-16 w-16 rounded-full object-cover" />
              <button aria-label="Fermer la navigation" onClick={() => setOpen(false)} className="rounded-md p-3 text-sofia-cream">
                <X />
              </button>
            </div>
            {nav.map(([label, href]) => (
              <a key={href} href={href} onClick={() => setOpen(false)} className="border-b border-white/10 py-3 text-lg font-semibold text-sofia-cream">
                {label}
              </a>
            ))}
            <a href={`https://wa.me/${businessConfig.whatsappNumber}`} target="_blank" rel="noreferrer">
              <Button className="w-full">Commander sur WhatsApp</Button>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

function CartButton({ cartCount, onCartOpen }: HeaderProps) {
  return (
    <button aria-label="Ouvrir le panier" onClick={onCartOpen} className="relative rounded-md border border-sofia-gold/40 p-3 text-sofia-gold transition hover:bg-sofia-gold hover:text-black">
      <ShoppingBag size={22} />
      {cartCount > 0 && <span className="absolute -right-2 -top-2 grid h-6 min-w-6 place-items-center rounded-full bg-sofia-copper px-1 text-xs font-bold text-white">{cartCount}</span>}
    </button>
  );
}
