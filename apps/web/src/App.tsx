import { useState } from "react";
import { CartDrawer } from "./components/cart/CartDrawer";
import { CheckoutModal } from "./components/checkout/CheckoutModal";
import { Header } from "./components/layout/Header";
import { About, CateringHalalService, ContactLocation, FloatingWhatsApp, Footer, Hero, HowToOrder, PaymentsFaq } from "./components/sections/MarketingSections";
import { MenuSection } from "./components/sections/MenuSection";
import { businessConfig } from "./config/business";
import { useCart } from "./hooks/useCart";
import type { MenuItem } from "./types/menu";

function App() {
  const cart = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const orderNow = (item: MenuItem) => {
    cart.addItem(item);
    setCartOpen(true);
  };

  const openCheckout = () => {
    setCartOpen(false);
    setCheckoutOpen(true);
  };

  return (
    <>
      <StructuredData />
      <Header cartCount={cart.count} onCartOpen={() => setCartOpen(true)} />
      <main>
        <Hero />
        <MenuSection onAdd={cart.addItem} onOrderNow={orderNow} />
        <About />
        <HowToOrder />
        <CateringHalalService />
        <PaymentsFaq />
        <ContactLocation />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <CartDrawer
        open={cartOpen}
        items={cart.items}
        subtotal={cart.subtotal}
        onClose={() => setCartOpen(false)}
        onIncrease={cart.increase}
        onDecrease={cart.decrease}
        onRemove={cart.removeItem}
        onClear={cart.clearCart}
        onCheckout={openCheckout}
      />
      <CheckoutModal open={checkoutOpen} items={cart.items} onClose={() => setCheckoutOpen(false)} />
    </>
  );
}

function StructuredData() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: businessConfig.name,
    description: businessConfig.description,
    email: businessConfig.email,
    telephone: businessConfig.whatsappDisplay,
    servesCuisine: ["Cuisine ouest-africaine", "Cuisine africaine", "Cuisine halal"],
    areaServed: businessConfig.serviceAreas.map((name) => ({ "@type": "City", name })),
    address: {
      "@type": "PostalAddress",
      streetAddress: "1580 Park Avenue",
      addressLocality: "New York",
      addressRegion: "NY",
      postalCode: "10029",
      addressCountry: "US",
    },
    halal: true,
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

export default App;
