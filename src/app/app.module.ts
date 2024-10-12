import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KnexService } from 'src/services/knex.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService,KnexService],
})
export class AppModule {}
