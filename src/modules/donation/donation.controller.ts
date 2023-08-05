import { ApiGuard, CurrentUser, UserPayload } from '@app/auth';
import {
  CommonResponseDTO,
  DCSRequestLogInterceptor,
  DCSValidationPipe,
  SwaggerResponseType,
  TransformInterceptor,
} from '@app/common';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { DonationService } from './donation.service';
import { CreateDonationListDTO } from './dtos/create-donation.dto';
import { DonationResponseDTO } from './dtos/donation-response.dto';
import { QueryDonationDTO } from './dtos/query-donation.dto';
import { UpdateDonationDTO } from './dtos/update-donation.dto';
import { DonationEntity } from './entities/donation.entity';

@ApiTags('donation')
@Controller('donation')
@ApiGuard()
@UsePipes(DCSValidationPipe)
@UseInterceptors(TransformInterceptor, DCSRequestLogInterceptor)
export class DonationController {
  constructor(private readonly donationService: DonationService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: () => SwaggerResponseType(DonationResponseDTO, true) })
  public async createDonationList(
    @Body() body: CreateDonationListDTO,
    @CurrentUser() user: UserPayload,
  ): Promise<DonationEntity[]> {
    return await this.donationService.createDonationList(body.list, user);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiQuery({ type: QueryDonationDTO })
  @ApiOkResponse({ type: () => SwaggerResponseType(DonationResponseDTO, true) })
  public async getDonationList(
    @Query() query: QueryDonationDTO,
    @CurrentUser() user: UserPayload,
  ): Promise<DonationEntity[]> {
    return await this.donationService.getDonationList(
      query.fromDate,
      query.toDate,
      query.currentPage,
      query.perPage,
      user,
    );
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: () => SwaggerResponseType(DonationResponseDTO) })
  public async getDonation(
    @Param('id') id: number,
    @CurrentUser() user: UserPayload,
  ): Promise<DonationEntity> {
    return await this.donationService.getDonation(id, user);
  }

  @Patch('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: () => SwaggerResponseType(CommonResponseDTO) })
  public async updateDonation(
    @Param('id') id: number,
    @Body() body: UpdateDonationDTO,
    @CurrentUser() user: UserPayload,
  ) {
    return await this.donationService.updateDonation(id, body, user);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: () => SwaggerResponseType(CommonResponseDTO) })
  public async softDeleteDonation(
    @Param('id') id: number,
    @CurrentUser() user: UserPayload,
  ): Promise<CommonResponseDTO> {
    return await this.donationService.softDeleteDonation(id, user);
  }
}
