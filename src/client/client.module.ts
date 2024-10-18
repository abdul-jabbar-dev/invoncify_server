import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { ClientService } from "./client.service";
import { ClientController } from "./client.controller";
import { KnexClientService } from "src/services/knex-client.service";
import { FirebaseService } from "src/services/firebase.service";
import { AuthTokenMiddleware } from "src/middleware/auth-token.middleware";

@Module({
  controllers: [ClientController],
  providers: [ClientService, KnexClientService,FirebaseService],
})
export class ClientModule  implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthTokenMiddleware).forRoutes({path:'client/new-client',method:RequestMethod.POST},{path:'client/all-clients',method:RequestMethod.GET},)
  } 
}
