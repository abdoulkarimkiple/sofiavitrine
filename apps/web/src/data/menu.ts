import attiekeImage from "../assets/plats/Attieke.jpg";
import bissapImage from "../assets/plats/bissap.jpg";
import brochetteAllocoImage from "../assets/plats/brochette_alloco.png";
import dibiOversizeImage from "../assets/plats/dibi_oversize.jpeg";
import dibiSimpleImage from "../assets/plats/dibi_simple.png";
import eauImage from "../assets/plats/eau.jpeg";
import gingerImage from "../assets/plats/ginger.jpg";
import pintadeOversizeImage from "../assets/plats/pintade_oversize.png";
import pintadeSimpleImage from "../assets/plats/pintade_simple.jpeg";
import poissonOversizeImage from "../assets/plats/poisson_braise_oversize.jpeg";
import poissonSimpleImage from "../assets/plats/poisson_braise_simple.jpeg";
import saladeImage from "../assets/plats/Salade_verte.jpg";
import rizAuGrasImage from "../assets/plats/riz_au_gras.jpeg";
import sauceArachideImage from "../assets/plats/sauce_arachide.png";
import sauceFakoyeImage from "../assets/plats/sauce_fakoye.png";
import sauceFeuilleManiocImage from "../assets/plats/sauce_feuille_arachide.jpeg";
import sauceGraineImage from "../assets/plats/sauce_graine.png";
import sauceSakassakaImage from "../assets/plats/sauce_sakassaka.png";
import sauceTomateImage from "../assets/plats/sauce_tomate.png";
import sauceYassaImage from "../assets/plats/sauce_yassa.png";
import type { MenuCategory, MenuItem } from "../types/menu";

export const categories: MenuCategory[] = ["Tout", "Plats", "Beverage"];

const item = (
  id: string,
  name: string,
  description: string,
  price: number,
  category: MenuCategory,
  image: string,
  popular = false,
  spicyLevel: 0 | 1 | 2 | 3 = 1,
  dietaryTags: string[] = ["Halal"],
  available = true,
  priceLabel?: string,
): MenuItem => ({
  id,
  name,
  description,
  price,
  category,
  image,
  popular,
  available,
  spicyLevel,
  halal: true,
  dietaryTags,
  priceLabel,
});

export const menuItems: MenuItem[] = [
  item("riz-au-gras", "Riz au gras", "Riz au gras maison, généreux et bien assaisonné.", 18, "Plats", rizAuGrasImage, true, 1),
  item("riz-sauce-tomate", "Riz avec sauce tomate", "Riz servi avec une sauce tomate savoureuse.", 15, "Plats", sauceTomateImage, true, 1),
  item("riz-sauce-arachide", "Riz avec sauce arachide", "Riz servi avec une sauce arachide onctueuse.", 15, "Plats", sauceArachideImage, true, 1),
  item("riz-feuille-manioc", "Riz avec feuille de manioc", "Riz accompagné d'une sauce aux feuilles de manioc.", 15, "Plats", sauceFeuilleManiocImage, false, 1),
  item("riz-sauce-sakassaka", "Riz avec sauce sakassaka", "Riz servi avec une sauce sakassaka traditionnelle.", 15, "Plats", sauceSakassakaImage, false, 1),
  item("riz-sauce-fakoye", "Riz avec sauce fakoye", "Riz accompagné d'une sauce fakoye préparée à la façon maison.", 15, "Plats", sauceFakoyeImage, false, 1),
  item("riz-sauce-graine", "Riz avec sauce graine", "Riz servi avec une sauce graine riche et parfumée.", 15, "Plats", sauceGraineImage, false, 1),
  item("riz-sauce-yassa", "Riz avec sauce yassa", "Riz accompagné d'une sauce yassa aux oignons et au citron.", 15, "Plats", sauceYassaImage, false, 1),
  item("salade", "Salade", "Salade fraîche et légère.", 8, "Plats", saladeImage, false, 0, ["Halal", "Végétarien"]),
  item("poisson-braise-simple", "Poisson braisé simple", "Poisson braisé, format simple.", 15, "Plats", poissonSimpleImage, true, 1),
  item("poisson-braise-oversize", "Poisson braisé oversize", "Poisson braisé, grand format.", 22, "Plats", poissonOversizeImage, false, 1),
  item("pintade-simple", "Pintade simple", "Pintade savoureuse, format simple.", 15, "Plats", pintadeSimpleImage, true, 1),
  item("pintade-oversize", "Pintade oversize", "Pintade savoureuse, grand format.", 20, "Plats", pintadeOversizeImage, false, 1),
  item("attieke", "Attiéké", "Semoule de manioc légère, idéale en accompagnement.", 15, "Plats", attiekeImage, false, 0, ["Halal", "Végétarien"]),
  item("dibi-simple", "Dibi simple", "Dibi grillé, format simple.", 15, "Plats", dibiSimpleImage, true, 1),
  item("dibi-side", "Dibi oversize", "Dibi grillé avec accompagnement.", 20, "Plats", dibiOversizeImage, false, 1),
  item("brochette-alloco", "Brochette Alloco", "Brochettes grillées servies avec alloco.", 18, "Plats", brochetteAllocoImage, true, 1),
  item("eau", "Eau", "Bouteille d'eau.", 1, "Beverage", eauImage, false, 0, ["Halal", "Végétarien"]),
  item("ginger", "Ginger", "Jus de gingembre frais et parfumé.", 5, "Beverage", gingerImage, false, 1, ["Halal", "Végétarien"]),
  item("bissap", "Bissap", "Boisson fraîche à l'hibiscus.", 5, "Beverage", bissapImage, false, 0, ["Halal", "Végétarien"]),
];
