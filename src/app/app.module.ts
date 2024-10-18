import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InvoiceModule } from 'src/invoice/invoice.module';
import { KnexClientService } from 'src/services/knex-client.service';
import { ClientModule } from 'src/client/client.module';
import { FirebaseService } from 'src/services/firebase.service';

@Module({
  imports: [InvoiceModule,ClientModule],
  controllers: [AppController],
  providers: [AppService, KnexClientService,FirebaseService],
})
export class AppModule {}
