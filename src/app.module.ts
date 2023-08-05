import { AuthModule } from '@app/auth';
import { DCSValidationPipe, HttpExceptionFilter } from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';
import { AccountModule } from './modules/account/account.module';
import { DonationModule } from './modules/donation/donation.module';
import { RoleModule } from './modules/role/role.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    EventEmitterModule.forRoot({
      global: true,
    }),
    AuthModule,
    AccountModule,
    UserModule,
    RoleModule,
    DonationModule,
  ],
  providers: [
    { provide: APP_PIPE, useClass: DCSValidationPipe },
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
  ],
})
export class AppModule {}
