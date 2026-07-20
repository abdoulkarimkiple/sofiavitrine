# African Restaurant Sofia

Site vitrine React + Vite + TypeScript + Tailwind CSS pour African Restaurant Sofia.

## Installation

1. Installer Node.js depuis `https://nodejs.org`.
2. Dans ce dossier, lancer `npm install`.
3. Lancer le site en local avec `npm run dev`.
4. Generer la version Hostinger avec `npm run build`.
5. Le dossier pret a deployer est `dist`.

## Modifications courantes

- Infos restaurant, WhatsApp, email, reseaux sociaux, adresse et Google Maps : `src/config/business.ts`.
- Horaires : `src/config/hours.ts`.
- Menu, prix, categories et images temporaires : `src/data/menu.ts`.
- FAQ : `src/data/faq.ts`.
- Temoignages demo : `src/data/testimonials.ts`.
- Logo et carte commerciale : `src/assets/branding/`.
- Moyens de paiement et zones de livraison : `src/config/business.ts`.

## Ajouter Google Maps

Ne pas inventer d'adresse. Quand l'adresse exacte est disponible :

1. Mettre `address` a jour dans `src/config/business.ts`.
2. Coller le lien public dans `googleMapsUrl`.
3. Dans Google Maps, cliquer Partager > Integrer une carte, copier l'URL `src` de l'iframe.
4. Coller cette URL dans `googleMapsEmbedUrl`.
5. La section Location affichera automatiquement l'iframe au lieu du placeholder.

## Remplacer les photos

Mettre les vraies photos dans `src/assets/dishes/`, puis remplacer les URLs dans `src/data/menu.ts`.

## Hostinger

1. Lancer `npm run build`.
2. Ouvrir le dossier `dist`.
3. Envoyer le contenu de `dist` dans `public_html` sur Hostinger.
4. Connecter le domaine depuis le panneau Hostinger.
5. Activer HTTPS/SSL dans Hostinger.
6. Vider le cache Hostinger si les changements ne s'affichent pas.
7. Le fichier `public/.htaccess` est fourni pour les routes React si besoin.

## Notes importantes

- Aucune donnee bancaire n'est collectee.
- Aucune commande n'est confirmee automatiquement.
- Les commandes sont envoyees sur WhatsApp avec `https://wa.me/19295804530`.
- Les prix sont temporaires et le total final doit etre confirme sur WhatsApp.
