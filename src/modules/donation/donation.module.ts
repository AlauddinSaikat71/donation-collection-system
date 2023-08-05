import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DonationController } from './donation.controller';
import { DonationService } from './donation.service';
import { DonationEntity } from './entities/donation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DonationEntity])],
  exports: [DonationService],
  providers: [DonationService],
  controllers: [DonationController],
})
export class DonationModule {}
