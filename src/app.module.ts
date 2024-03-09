import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { AudioModule } from './audio/audio.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AudioModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
