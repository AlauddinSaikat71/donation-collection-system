import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    EventEmitterModule.forRoot({
      global: true,
    }),
  ],
  providers: [
    //{ provide: APP_PIPE, useClass: EMSValidationPipe },
    //{ provide: APP_FILTER, useClass: HttpExceptionFilter },
  ],
})
export class AppModule {}
