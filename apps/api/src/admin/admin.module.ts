import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { AdminMenuController } from "./admin-menu.controller";
import { AdminMenuService } from "./admin-menu.service";

@Module({
  imports: [AuthModule],
  controllers: [AdminMenuController],
  providers: [AdminMenuService],
})
export class AdminModule {}
