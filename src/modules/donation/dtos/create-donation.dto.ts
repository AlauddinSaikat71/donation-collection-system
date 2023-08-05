import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { TRASFERRED_VIA_ENUM } from '../enums/via.enum';

export class CreateDonationDTO {
  @ApiProperty()
  donatedBy: number;

  @ApiProperty()
  amount: number;

  @ApiProperty({ enum: TRASFERRED_VIA_ENUM })
  transferredVia: TRASFERRED_VIA_ENUM;
}

export class CreateDonationListDTO {
  @ApiProperty({ type: CreateDonationDTO, isArray: true })
  @Type(() => CreateDonationDTO)
  @IsArray()
  @ValidateNested()
  list: CreateDonationDTO[];
}
