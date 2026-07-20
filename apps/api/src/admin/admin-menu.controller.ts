import { Body, Controller, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { AdminMenuService } from "./admin-menu.service";
import { CreateCategoryDto, UpdateCategoryDto } from "./dto/category.dto";
import { CreateProductDto, UpdateProductDto } from "./dto/product.dto";

@Controller("admin")
@UseGuards(JwtAuthGuard)
export class AdminMenuController {
  constructor(private readonly adminMenuService: AdminMenuService) {}

  @Get("categories")
  findCategories() {
    return this.adminMenuService.findCategories();
  }

  @Post("categories")
  createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.adminMenuService.createCategory(createCategoryDto);
  }

  @Patch("categories/:id")
  updateCategory(@Param("id") id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.adminMenuService.updateCategory(id, updateCategoryDto);
  }

  @Get("products")
  findProducts() {
    return this.adminMenuService.findProducts();
  }

  @Post("products")
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.adminMenuService.createProduct(createProductDto);
  }

  @Patch("products/:id")
  updateProduct(@Param("id") id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.adminMenuService.updateProduct(id, updateProductDto);
  }
}
