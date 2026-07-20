import { Injectable } from "@nestjs/common";
import { PrismaService } from "../database/prisma.service";

@Injectable()
export class MenuService {
  constructor(private readonly prisma: PrismaService) {}

  async findPublicMenu() {
    const categories = await this.prisma.category.findMany({
      where: {
        isActive: true,
      },
      orderBy: [
        {
          sortOrder: "asc",
        },
        {
          name: "asc",
        },
      ],
      include: {
        products: {
          where: {
            isAvailable: true,
          },
          orderBy: [
            {
              sortOrder: "asc",
            },
            {
              name: "asc",
            },
          ],
        },
      },
    });

    return {
      categories: ["Tout", ...categories.map((category) => category.name)],
      items: categories.flatMap((category) =>
        category.products.map((product) => ({
          id: product.slug,
          name: product.name,
          description: product.description,
          price: product.priceCents / 100,
          category: category.name,
          image: product.imageUrl,
          popular: product.isFeatured,
          available: product.isAvailable,
          spicyLevel: 1,
          halal: true,
          dietaryTags: ["Halal"],
        })),
      ),
    };
  }
}
