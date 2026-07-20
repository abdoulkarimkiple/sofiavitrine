import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHealth() {
    return {
      status: "ok",
      service: "sofia-api",
      timestamp: new Date().toISOString(),
    };
  }
}
