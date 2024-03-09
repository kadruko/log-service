import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AudioModule } from './audio/audio.module';

@Module({
  imports: [AudioModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
