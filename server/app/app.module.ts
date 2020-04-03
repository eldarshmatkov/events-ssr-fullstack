import {Global, Module} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './events/events.module';
import { NuxtModule } from './nuxt/nuxt.module';

@Global()
@Module({
  imports: [EventsModule, NuxtModule], //nuxt module last, else 404 errors on most requests
  controllers: [
    AppController,
  ],
  providers: [AppService],
})
export class AppModule {}
