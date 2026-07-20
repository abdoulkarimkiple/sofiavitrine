import type { CartItem } from "../types/menu";
import { businessConfig } from "../config/business";
import { formatCurrency } from "./currency";

export type CheckoutForm = {
  fullName: string;
  phone: string;
  email?: string;
  orderType: string;
  deliveryAddress: string;
  apartment?: string;
  borough: string;
  preferredTime: string;
  paymentPreference: string;
  deliveryInstructions?: string;
  additionalNotes?: string;
};

const clean = (value?: string) => (value || "").replace(/\s+/g, " ").trim();

export const buildWhatsAppUrl = (message: string) =>
  `https://wa.me/${businessConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;

export function buildOrderMessage(items: CartItem[], form: CheckoutForm) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const lines = items.map(
    (item) => `- ${item.quantity} x ${item.name} - ${formatCurrency(item.price * item.quantity)}`,
  );

  return [
    `Bonjour ${businessConfig.name},`,
    "",
    "Je souhaite passer une commande.",
    "",
    "DÉTAILS DE LA COMMANDE :",
    ...lines,
    "",
    `Sous-total : ${formatCurrency(subtotal)}`,
    "",
    "INFORMATIONS CLIENT",
    `Nom : ${clean(form.fullName)}`,
    `Téléphone : ${clean(form.phone)}`,
    form.email ? `E-mail : ${clean(form.email)}` : "",
    `Type de commande : ${clean(form.orderType)}`,
    `Borough : ${clean(form.borough)}`,
    form.deliveryAddress ? `Adresse : ${clean(form.deliveryAddress)}` : "",
    form.apartment ? `Appartement/étage : ${clean(form.apartment)}` : "",
    `Heure souhaitée : ${clean(form.preferredTime)}`,
    `Mode de paiement préféré : ${clean(form.paymentPreference)}`,
    form.deliveryInstructions ? `Instructions : ${clean(form.deliveryInstructions)}` : "",
    form.additionalNotes ? `Notes supplémentaires : ${clean(form.additionalNotes)}` : "",
    "",
    "Merci de confirmer la disponibilité, les frais de livraison, le total final et les consignes de paiement.",
    "",
    "Merci.",
  ]
    .filter(Boolean)
    .join("\n");
}

export function buildCateringMessage() {
  return [
    `Bonjour ${businessConfig.name},`,
    "",
    "Je souhaite obtenir des informations sur votre service traiteur.",
    "",
    "Type d'événement :",
    "Date de l'événement :",
    "Nombre d'invités :",
    "Plats souhaités :",
    "Lieu de livraison :",
    "Budget:",
    "Informations supplémentaires :",
    "",
    "Merci de me contacter pour discuter des options disponibles.",
  ].join("\n");
}
