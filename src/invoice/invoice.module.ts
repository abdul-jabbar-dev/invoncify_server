import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from "@nestjs/common";
import { InvoiceService } from "./invoice.service";
import { InvoiceController } from "./invoice.controller";
import { AuthTokenMiddleware } from "src/middleware/auth-token.middleware";
import { FirebaseService } from "src/services/firebase.service";
import { KnexClientService } from "src/services/knex-client.service";
import { ClientService } from "src/client/client.service";

@Module({
  controllers: [InvoiceController],
  providers: [
    InvoiceService,
    FirebaseService,
    KnexClientService,
    ClientService,
  ],
})
export class InvoiceModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthTokenMiddleware)
      .forRoutes({ path: "invoice/new", method: RequestMethod.POST },{ path: "invoice/my-invoices", method: RequestMethod.GET },);
  }
}
