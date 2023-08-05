import { ApiPropertyOptional, OmitType, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';
import { CreateDonationDTO } from './create-donation.dto';

export class UpdateDonationDTO extends PartialType(
  OmitType(CreateDonationDTO, ['donatedBy']),
) {
  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
