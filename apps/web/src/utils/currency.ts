export const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "USD",
  }).format(amount);
