const { PrismaClient } = require("@prisma/client");
const { pbkdf2Sync, randomBytes } = require("node:crypto");

const prisma = new PrismaClient();

function hashPassword(password) {
  const iterations = 120000;
  const keyLength = 64;
  const digest = "sha512";
  const salt = randomBytes(16).toString("hex");
  const hash = pbkdf2Sync(password, salt, iterations, keyLength, digest).toString("hex");

  return `pbkdf2$${iterations}$${salt}$${hash}`;
}

const categories = [
  { name: "Plats", slug: "plats", sortOrder: 1 },
  { name: "Beverage", slug: "beverage", sortOrder: 2 },
];

const products = [
  ["riz-au-gras", "Riz au gras", "Riz au gras maison, généreux et bien assaisonné.", 1800, "plats", true, 1],
  ["riz-sauce-tomate", "Riz avec sauce tomate", "Riz servi avec une sauce tomate savoureuse.", 1500, "plats", true, 2],
  ["riz-sauce-arachide", "Riz avec sauce arachide", "Riz servi avec une sauce arachide onctueuse.", 1500, "plats", true, 3],
  ["riz-feuille-manioc", "Riz avec feuille de manioc", "Riz accompagné d'une sauce aux feuilles de manioc.", 1500, "plats", false, 4],
  ["riz-sauce-sakassaka", "Riz avec sauce sakassaka", "Riz servi avec une sauce sakassaka traditionnelle.", 1500, "plats", false, 5],
  ["riz-sauce-fakoye", "Riz avec sauce fakoye", "Riz accompagné d'une sauce fakoye préparée à la façon maison.", 1500, "plats", false, 6],
  ["riz-sauce-graine", "Riz avec sauce graine", "Riz servi avec une sauce graine riche et parfumée.", 1500, "plats", false, 7],
  ["riz-sauce-yassa", "Riz avec sauce yassa", "Riz accompagné d'une sauce yassa aux oignons et au citron.", 1500, "plats", false, 8],
  ["salade", "Salade", "Salade fraîche et légère.", 800, "plats", false, 9],
  ["poisson-braise-simple", "Poisson braisé simple", "Poisson braisé, format simple.", 1500, "plats", true, 10],
  ["poisson-braise-oversize", "Poisson braisé oversize", "Poisson braisé, grand format.", 2200, "plats", false, 11],
  ["pintade-simple", "Pintade simple", "Pintade savoureuse, format simple.", 1500, "plats", true, 12],
  ["pintade-oversize", "Pintade oversize", "Pintade savoureuse, grand format.", 2000, "plats", false, 13],
  ["attieke", "Attiéké", "Semoule de manioc légère, idéale en accompagnement.", 1500, "plats", false, 14],
  ["dibi-simple", "Dibi simple", "Dibi grillé, format simple.", 1500, "plats", true, 15],
  ["dibi-side", "Dibi oversize", "Dibi grillé avec accompagnement.", 2000, "plats", false, 16],
  ["brochette-alloco", "Brochette Alloco", "Brochettes grillées servies avec alloco.", 1800, "plats", true, 17],
  ["eau", "Eau", "Bouteille d'eau.", 100, "beverage", false, 1],
  ["ginger", "Ginger", "Jus de gingembre frais et parfumé.", 500, "beverage", false, 2],
  ["bissap", "Bissap", "Boisson fraîche à l'hibiscus.", 500, "beverage", false, 3],
];

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL ?? "admin@africanrestaurantsofia.com";
  const adminPassword = process.env.ADMIN_PASSWORD ?? "ChangeMe123!";

  await prisma.user.upsert({
    where: { email: adminEmail.toLowerCase() },
    update: {
      name: "Admin",
      role: "ADMIN",
      isActive: true,
    },
    create: {
      name: "Admin",
      email: adminEmail.toLowerCase(),
      passwordHash: hashPassword(adminPassword),
      role: "ADMIN",
      isActive: true,
    },
  });

  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: category,
      create: category,
    });
  }

  for (const [slug, name, description, priceCents, categorySlug, isFeatured, sortOrder] of products) {
    const category = await prisma.category.findUniqueOrThrow({
      where: { slug: categorySlug },
    });

    await prisma.product.upsert({
      where: { slug },
      update: {
        categoryId: category.id,
        name,
        description,
        priceCents,
        isFeatured,
        sortOrder,
        isAvailable: true,
      },
      create: {
        categoryId: category.id,
        slug,
        name,
        description,
        priceCents,
        isFeatured,
        sortOrder,
        isAvailable: true,
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
