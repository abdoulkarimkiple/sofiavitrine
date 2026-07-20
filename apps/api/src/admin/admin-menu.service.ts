import { Injectable } from "@nestjs/common";
import { PrismaService } from "../database/prisma.service";
import { CreateCategoryDto, UpdateCategoryDto } from "./dto/category.dto";
import { CreateProductDto, UpdateProductDto } from "./dto/product.dto";

@Injectable()
export class AdminMenuService {
  constructor(private readonly prisma: PrismaService) {}

  findCategories() {
    return this.prisma.category.findMany({
      orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
      include: {
        _count: {
          select: {
            products: true,
          },
        },
      },
    });
  }

  createCategory(data: CreateCategoryDto) {
    return this.prisma.category.create({
      data: {
        ...data,
        slug: data.slug.toLowerCase(),
      },
    });
  }

  updateCategory(id: string, data: UpdateCategoryDto) {
    return this.prisma.category.update({
      where: { id },
      data: {
        ...data,
        slug: data.slug?.toLowerCase(),
      },
    });
  }

  findProducts() {
    return this.prisma.product.findMany({
      orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
      include: {
        category: true,
        variants: true,
      },
    });
  }

  createProduct(data: CreateProductDto) {
    return this.prisma.product.create({
      data: {
        ...data,
        slug: data.slug.toLowerCase(),
      },
      include: {
        category: true,
      },
    });
  }

  updateProduct(id: string, data: UpdateProductDto) {
    return this.prisma.product.update({
      where: { id },
      data: {
        ...data,
        slug: data.slug?.toLowerCase(),
      },
      include: {
        category: true,
      },
    });
  }
}
