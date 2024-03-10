import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { AudioModule } from './audio/audio.module';
import { DatabaseModule } from './database/database.module';
import { LogModule } from './log/log.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    LogModule,
    AudioModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
