import { ApiResponseProperty } from '@nestjs/swagger';

export class DonationResponseDTO {
  @ApiResponseProperty()
  id: number;

  @ApiResponseProperty()
  donatedBy: number;

  @ApiResponseProperty()
  amount: number;

  @ApiResponseProperty()
  transferredVia: string;

  @ApiResponseProperty()
  createdBy: number;

  @ApiResponseProperty()
  lastUpdatedBy: string;

  @ApiResponseProperty()
  createdAt: string;

  @ApiResponseProperty()
  updatedAt: string;

  @ApiResponseProperty()
  isActive: boolean;
}
