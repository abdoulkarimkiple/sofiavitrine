import { Send, X } from "lucide-react";
import { FormEvent, useState } from "react";
import type { CartItem } from "../../types/menu";
import { buildOrderMessage, buildWhatsAppUrl, type CheckoutForm } from "../../utils/whatsapp";
import { Button } from "../ui/Button";

type CheckoutModalProps = {
  open: boolean;
  items: CartItem[];
  onClose: () => void;
};

const initialForm: CheckoutForm = {
  fullName: "",
  phone: "",
  email: "",
  orderType: "Livraison",
  deliveryAddress: "",
  apartment: "",
  borough: "Brooklyn",
  preferredTime: "",
  paymentPreference: "Confirmer sur WhatsApp",
  deliveryInstructions: "",
  additionalNotes: "",
};

export function CheckoutModal({ open, items, onClose }: CheckoutModalProps) {
  const [form, setForm] = useState<CheckoutForm>(initialForm);
  const [error, setError] = useState("");
  if (!open) return null;

  const update = (key: keyof CheckoutForm, value: string) => setForm((current) => ({ ...current, [key]: value }));

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!form.fullName.trim() || !form.phone.trim() || !form.preferredTime.trim()) {
      setError("Veuillez ajouter votre nom, votre numéro de téléphone et l'heure souhaitée.");
      return;
    }
    if (form.orderType === "Livraison" && (!form.deliveryAddress.trim() || !form.borough.trim())) {
      setError("Veuillez ajouter votre adresse de livraison et votre borough.");
      return;
    }
    setError("");
    window.open(buildWhatsAppUrl(buildOrderMessage(items, form)), "_blank", "noopener,noreferrer");
  };

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto bg-black/75 p-4" onClick={onClose}>
      <div className="mx-auto my-8 max-w-3xl rounded-lg border border-sofia-gold/30 bg-sofia-charcoal text-sofia-cream shadow-2xl" onClick={(event) => event.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-white/10 p-5">
          <h2 className="font-display text-2xl font-bold">Commande WhatsApp</h2>
          <button aria-label="Fermer la commande" onClick={onClose} className="rounded-md p-2 hover:bg-white/10"><X /></button>
        </div>
        <form onSubmit={submit} className="grid gap-5 p-5 md:grid-cols-2">
          <Field label="Nom complet" value={form.fullName} onChange={(value) => update("fullName", value)} required />
          <Field label="Numéro de téléphone" value={form.phone} onChange={(value) => update("phone", value)} required />
          <Field label="E-mail (facultatif)" type="email" value={form.email} onChange={(value) => update("email", value)} />
          <Select label="Type de commande" value={form.orderType} onChange={(value) => update("orderType", value)} options={["Livraison", "À emporter", "Demande pour manger sur place"]} />
          <Field label="Adresse de livraison" value={form.deliveryAddress} onChange={(value) => update("deliveryAddress", value)} />
          <Field label="Appartement ou étage (facultatif)" value={form.apartment} onChange={(value) => update("apartment", value)} />
          <Select label="Arrondissement / borough" value={form.borough} onChange={(value) => update("borough", value)} options={["Manhattan", "Brooklyn", "Queens", "The Bronx", "Staten Island", "Autre"]} />
          <Field label="Heure souhaitée" value={form.preferredTime} onChange={(value) => update("preferredTime", value)} required />
          <Select label="Mode de paiement préféré" value={form.paymentPreference} onChange={(value) => update("paymentPreference", value)} options={["Zelle", "Cash App", "Apple Cash", "Espèces à la livraison", "Carte à la livraison", "Confirmer sur WhatsApp"]} />
          <Field label="Instructions de livraison" value={form.deliveryInstructions} onChange={(value) => update("deliveryInstructions", value)} />
          <label className="md:col-span-2">
            <span className="mb-2 block text-sm font-bold">Notes supplémentaires</span>
            <textarea value={form.additionalNotes} onChange={(event) => update("additionalNotes", event.target.value)} className="min-h-28 w-full rounded-md border border-white/10 bg-black/35 p-3 outline-none focus:border-sofia-gold" />
          </label>
          <p className="md:col-span-2 rounded-md border border-sofia-gold/25 bg-black/25 p-4 text-sm text-sofia-muted">Votre commande est confirmée uniquement après la réponse d'African Restaurant Sofia sur WhatsApp. N'envoyez pas de numéro de carte bancaire, de CVV, d'identifiants bancaires, de mots de passe ni de codes de vérification.</p>
          {error && <p className="md:col-span-2 rounded-md bg-red-950/60 p-3 text-red-100">{error}</p>}
          <div className="md:col-span-2">
            <Button type="submit" className="w-full"><Send size={18} /> Envoyer la commande sur WhatsApp</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type = "text", required = false }: { label: string; value?: string; onChange: (value: string) => void; type?: string; required?: boolean }) {
  return (
    <label>
      <span className="mb-2 block text-sm font-bold">{label}</span>
      <input required={required} type={type} value={value} onChange={(event) => onChange(event.target.value)} className="w-full rounded-md border border-white/10 bg-black/35 p-3 outline-none focus:border-sofia-gold" />
    </label>
  );
}

function Select({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: string[] }) {
  return (
    <label>
      <span className="mb-2 block text-sm font-bold">{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)} className="w-full rounded-md border border-white/10 bg-black/35 p-3 outline-none focus:border-sofia-gold">
        {options.map((option) => <option key={option}>{option}</option>)}
      </select>
    </label>
  );
}
