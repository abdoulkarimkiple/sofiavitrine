import { CalendarDays, CheckCircle2, CreditCard, Facebook, Instagram, Mail, MapPin, MessageCircle, Music2, ShieldCheck, Sparkles, Truck, Utensils, WalletCards } from "lucide-react";
import { siApple, siCashapp, siZelle } from "simple-icons";
import logo from "../../assets/branding/african-restaurant-sofia-logo.jpeg";
import businessCard from "../../assets/branding/african-restaurant-sofia-business-card.jpeg";
import { businessConfig } from "../../config/business";
import { faqs } from "../../data/faq";
import { buildCateringMessage, buildWhatsAppUrl } from "../../utils/whatsapp";
import { Button } from "../ui/Button";

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-black pt-28 text-sofia-cream">
      <img src="https://images.unsplash.com/photo-1644506336791-0e5be28c45d2?auto=format&fit=crop&w=1800&q=85" alt="Plat ouest-africain avec riz et grillade" className="absolute inset-0 h-full w-full object-cover opacity-45" />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/35" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-sofia-black to-transparent" />
      <div className="relative mx-auto grid min-h-[calc(100vh-7rem)] max-w-7xl items-center gap-10 px-4 pb-16 lg:grid-cols-[1.05fr_.75fr] lg:px-8">
        <div>
          <p className="eyebrow">{businessConfig.slogan}</p>
          <h1 className="max-w-4xl font-display text-5xl font-black uppercase leading-tight tracking-wide text-white md:text-7xl">
            Cuisine ouest-africaine authentique à New York
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-sofia-cream/85">
            Découvrez des saveurs généreuses, des portions copieuses et des plats halal authentiques préparés avec soin.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#menu"><Button>Voir le menu</Button></a>
            <a href={`https://wa.me/${businessConfig.whatsappNumber}`} target="_blank" rel="noreferrer"><Button variant="secondary">Commander sur WhatsApp</Button></a>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {["100 % halal", "Cuisine ouest-africaine authentique", "Livraison et plats à emporter", "Service traiteur disponible"].map((badge) => (
              <span key={badge} className="rounded-full border border-sofia-gold/35 bg-black/45 px-4 py-2 text-sm text-sofia-cream">{badge}</span>
            ))}
          </div>
        </div>
        <div className="mx-auto max-w-sm">
          <img src={logo} alt={`Logo officiel de ${businessConfig.name}`} className="rounded-full border border-sofia-gold/45 bg-black shadow-gold" />
        </div>
      </div>
    </section>
  );
}

export function About() {
  const points = ["Recettes ouest-africaines authentiques", "Cuisine 100 % halal", "Ingrédients frais", "Portions généreuses", "Saveurs maison", "Accueil chaleureux", "Livraison et plats à emporter", "Service traiteur"];
  return (
    <section id="about" className="section bg-sofia-black">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-2 lg:px-8">
        <div>
          <p className="eyebrow">À propos</p>
          <h2 className="section-title">Culture riche. Accueil chaleureux.</h2>
          <p className="section-copy">African Restaurant Sofia apporte à New York le goût authentique de l'Afrique de l'Ouest. Nos plats sont préparés avec des ingrédients soigneusement sélectionnés, des recettes traditionnelles et l'accueil chaleureux qui caractérise la culture africaine.</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {points.map((point) => <span key={point} className="flex items-center gap-2 text-sofia-cream"><CheckCircle2 size={18} className="text-sofia-gold" /> {point}</span>)}
          </div>
        </div>
        <img src={businessCard} alt={`Carte de visite de ${businessConfig.name}`} className="rounded-lg border border-sofia-gold/25 shadow-gold" />
      </div>
    </section>
  );
}

export function HowToOrder() {
  const steps = [
    ["Choisissez votre repas", "Sélectionnez vos plats, ajoutez les quantités et ouvrez votre panier."],
    ["Envoyez votre commande sur WhatsApp", "Renseignez vos coordonnées, puis envoyez le message de commande préparé automatiquement."],
    ["Confirmez le paiement et la livraison", "Le restaurant confirme la disponibilité, les frais de livraison, le total final et les consignes de paiement."],
  ];
  return (
    <section className="section bg-sofia-charcoal">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <p className="eyebrow text-center">Comment commander</p>
        <h2 className="section-title text-center">Une commande simple par WhatsApp</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {steps.map(([title, text], index) => (
            <div key={title} className="rounded-lg border border-sofia-gold/18 bg-black/30 p-6">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-sofia-gold font-black text-black">{index + 1}</span>
              <h3 className="mt-5 font-display text-2xl font-bold text-sofia-cream">{title}</h3>
              <p className="mt-3 leading-7 text-sofia-muted">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CateringHalalService() {
  const cateringUrl = buildWhatsAppUrl(buildCateringMessage());
  return (
    <>
      <section id="catering" className="section bg-sofia-black">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="eyebrow">Service traiteur</p>
            <h2 className="section-title">Apportez le goût de l'Afrique à votre événement</h2>
            <p className="section-copy">Repas de famille, anniversaires, mariages, événements d'entreprise, rencontres communautaires et célébrations privées peuvent être discutés directement avec le restaurant.</p>
            <a href={cateringUrl} target="_blank" rel="noreferrer"><Button><CalendarDays size={18} /> Demander un devis sur WhatsApp</Button></a>
          </div>
          <div className="rounded-lg border border-sofia-gold/25 bg-sofia-surface p-8">
            <ShieldCheck className="mb-4 text-sofia-gold" size={42} />
            <h3 className="font-display text-3xl font-bold text-sofia-cream">Engagement 100 % halal</h3>
            <p className="mt-4 leading-8 text-sofia-muted">Notre menu est préparé selon les standards de l'alimentation halal. Nous nous engageons à servir des plats savoureux et de qualité, que nos clients peuvent déguster en toute confiance.</p>
          </div>
        </div>
      </section>
      <section className="section bg-sofia-charcoal">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <p className="eyebrow text-center">Livraison et zones desservies</p>
          <h2 className="section-title text-center">Au service de New York</h2>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {businessConfig.serviceAreas.map((area) => <div key={area} className="rounded-lg border border-white/10 bg-black/30 p-5 text-center font-bold text-sofia-cream">{area}</div>)}
          </div>
          <p className="mt-6 text-center text-sofia-muted">La disponibilité, les délais et les frais de livraison varient selon l'adresse. Merci de confirmer sur WhatsApp.</p>
        </div>
      </section>
    </>
  );
}

type BrandIcon = {
  title: string;
  path: string;
  hex: string;
};

const paymentLogos: Array<{
  name: string;
  brandIcon?: BrandIcon;
  mark?: string;
  icon?: typeof WalletCards;
}> = [
  { name: "Zelle", brandIcon: siZelle },
  { name: "Cash App", brandIcon: siCashapp },
  { name: "Apple Cash", brandIcon: siApple },
  { name: "Espèces à la livraison", mark: "CASH", icon: WalletCards },
  { name: "Carte à la livraison", mark: "CARTE", icon: CreditCard },
];

export function PaymentsFaq() {
  return (
    <>
      <section className="section bg-sofia-black">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <p className="eyebrow text-center">Paiement</p>
          <h2 className="section-title text-center">Des options de paiement simples et flexibles</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {paymentLogos.map(({ name, brandIcon, mark, icon: Icon }) => (
              <div key={name} className="rounded-lg border border-sofia-gold/25 bg-sofia-surface p-5 text-center shadow-gold">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-sofia-gold/45 bg-white">
                  {brandIcon ? (
                    <BrandLogo icon={brandIcon} className="h-9 w-9" />
                  ) : (
                    <span className="text-sm font-black text-black">{mark}</span>
                  )}
                </div>
                {Icon && <Icon className="mx-auto mt-4 text-sofia-gold" size={24} />}
                <p className="mt-3 font-bold text-sofia-cream">{name}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-sofia-muted">Les détails de paiement et le total final sont communiqués après confirmation sur WhatsApp.</p>
        </div>
      </section>
      <section className="section bg-sofia-black">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <p className="eyebrow text-center">FAQ</p>
          <h2 className="section-title text-center">Bon à savoir</h2>
          <div className="mt-8 space-y-3">
            {faqs.map(([question, answer]) => <details key={question} className="rounded-lg border border-white/10 bg-sofia-surface p-5"><summary className="cursor-pointer font-bold text-sofia-cream">{question}</summary><p className="mt-3 leading-7 text-sofia-muted">{answer}</p></details>)}
          </div>
        </div>
      </section>
    </>
  );
}

function BrandLogo({ icon, className }: { icon: BrandIcon; className?: string }) {
  return (
    <svg role="img" aria-label={`Logo ${icon.title}`} viewBox="0 0 24 24" className={className}>
      <path fill={`#${icon.hex}`} d={icon.path} />
    </svg>
  );
}

export function ContactLocation() {
  const locationUrl = buildWhatsAppUrl(`Bonjour ${businessConfig.name},\n\nPouvez-vous m'envoyer l'adresse exacte du restaurant ?\n\nMerci.`);
  return (
    <section id="contact" className="section bg-sofia-charcoal">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 lg:grid-cols-2 lg:px-8">
        <div>
          <p className="eyebrow">Contact et adresse</p>
          <h2 className="section-title">Passez nous voir, commandez ou posez une question</h2>
          <div className="mt-8 space-y-4 text-sofia-cream">
            <p className="flex items-center gap-3"><Mail className="text-sofia-gold" /> <a href={`mailto:${businessConfig.email}`}>{businessConfig.email}</a></p>
            <p className="flex items-center gap-3"><MessageCircle className="text-sofia-gold" /> <a href={`https://wa.me/${businessConfig.whatsappNumber}`} target="_blank" rel="noreferrer">{businessConfig.whatsappDisplay}</a></p>
            <p className="flex items-center gap-3"><Instagram className="text-sofia-gold" /> {businessConfig.instagramUrl ? <a href={businessConfig.instagramUrl} target="_blank" rel="noreferrer">{businessConfig.instagramUsername}</a> : businessConfig.instagramUsername}</p>
            <p className="flex items-center gap-3"><Facebook className="text-sofia-gold" /> {businessConfig.facebookUrl ? <a href={businessConfig.facebookUrl} target="_blank" rel="noreferrer">{businessConfig.facebookUsername}</a> : businessConfig.facebookUsername}</p>
            <p className="flex items-center gap-3"><Music2 className="text-sofia-gold" /> {businessConfig.tiktokUrl ? <a href={businessConfig.tiktokUrl} target="_blank" rel="noreferrer">{businessConfig.tiktokUsername}</a> : businessConfig.tiktokUsername}</p>
            <p className="flex items-center gap-3"><MapPin className="text-sofia-gold" /> {businessConfig.locationDisplay}</p>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={`https://wa.me/${businessConfig.whatsappNumber}`} target="_blank" rel="noreferrer"><Button><MessageCircle size={18} /> WhatsApp</Button></a>
            <a href={`mailto:${businessConfig.email}`}><Button variant="secondary"><Mail size={18} /> E-mail</Button></a>
            {businessConfig.googleMapsUrl && <a href={businessConfig.googleMapsUrl} target="_blank" rel="noreferrer"><Button variant="secondary"><MapPin size={18} /> Maps</Button></a>}
          </div>
        </div>
        <div className="min-h-[360px] overflow-hidden rounded-lg border border-sofia-gold/25 bg-black/40">
          {businessConfig.googleMapsEmbedUrl ? (
            <iframe title={`Adresse Google Maps de ${businessConfig.name}`} src={businessConfig.googleMapsEmbedUrl} className="h-full min-h-[360px] w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          ) : (
            <div className="grid h-full min-h-[360px] place-items-center p-8 text-center">
              <div>
                <MapPin className="mx-auto mb-4 text-sofia-gold" size={54} />
                <h3 className="font-display text-3xl font-bold text-sofia-cream">{businessConfig.address}</h3>
                <p className="mx-auto mt-3 max-w-sm text-sofia-muted">Google Maps s'affichera ici dès que l'URL intégrée du restaurant sera ajoutée.</p>
                <a className="mt-6 inline-flex" href={locationUrl} target="_blank" rel="noreferrer"><Button variant="secondary">Demander l'adresse sur WhatsApp</Button></a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-sofia-gold/20 bg-black px-4 py-12 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-4">
        <div>
          <img src={logo} alt={`Logo de ${businessConfig.name}`} className="h-24 w-24 rounded-full" />
          <p className="mt-4 font-display text-xl text-sofia-cream">{businessConfig.name}</p>
          <p className="mt-2 text-sofia-gold">{businessConfig.slogan}</p>
        </div>
        <FooterList title="Navigation" items={["Accueil", "Menu", "À propos", "Traiteur", "Contact"]} />
        <FooterList title="Menu" items={["Tout", "Plats", "Beverage"]} />
        <div className="text-sofia-muted">
          <h3 className="mb-4 font-bold text-sofia-cream">Contact</h3>
          <p>{businessConfig.email}</p>
          <p>{businessConfig.whatsappDisplay}</p>
          <div className="mt-4 space-y-3">
            <FooterSocialLink icon={Instagram} label={businessConfig.instagramUsername} href={businessConfig.instagramUrl} />
            <FooterSocialLink icon={Facebook} label={businessConfig.facebookUsername} href={businessConfig.facebookUrl} />
            <FooterSocialLink icon={Music2} label={businessConfig.tiktokUsername} href={businessConfig.tiktokUrl} />
          </div>
          <p className="mt-3 text-sofia-gold">Cuisine halal</p>
        </div>
      </div>
      <div className="mx-auto mt-10 h-px max-w-7xl bg-gold-line" />
      <p className="mt-8 text-center text-sm text-sofia-muted">© {new Date().getFullYear()} African Restaurant Sofia. Tous droits réservés.</p>
    </footer>
  );
}

function FooterSocialLink({ icon: Icon, label, href }: { icon: typeof Instagram; label: string; href?: string }) {
  const content = (
    <>
      <Icon size={18} className="shrink-0 text-sofia-gold" />
      <span>{label}</span>
    </>
  );

  if (!href) {
    return <p className="flex items-center gap-2">{content}</p>;
  }

  return (
    <a href={href} target="_blank" rel="noreferrer" className="flex items-center gap-2 transition hover:text-sofia-gold">
      {content}
    </a>
  );
}

function FooterList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="mb-4 font-bold text-sofia-cream">{title}</h3>
      <ul className="space-y-2 text-sofia-muted">
        {items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </div>
  );
}

export function FloatingWhatsApp() {
  return (
    <a aria-label="Discuter sur WhatsApp" href={`https://wa.me/${businessConfig.whatsappNumber}`} target="_blank" rel="noreferrer" className="fixed bottom-5 right-5 z-30 grid h-14 w-14 place-items-center rounded-full bg-green-500 text-white shadow-2xl transition hover:scale-105">
      <MessageCircle />
    </a>
  );
}

export const IconRow = () => (
  <div className="flex items-center gap-3 text-sofia-gold">
    <Utensils /><Truck /><ShieldCheck /><Sparkles />
  </div>
);
