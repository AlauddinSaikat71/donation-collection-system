import { ORDER, Roles, UserPayload } from '@app/auth';
import { CommonResponseDTO } from '@app/common';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, mergeMap, toArray } from 'rxjs';
import { Between, Repository } from 'typeorm';
import { CreateDonationDTO } from './dtos/create-donation.dto';
import { UpdateDonationDTO } from './dtos/update-donation.dto';
import { DonationEntity } from './entities/donation.entity';

@Injectable()
export class DonationService {
  constructor(
    @InjectRepository(DonationEntity)
    private readonly donationRepo: Repository<DonationEntity>,
  ) {}

  public async createDonation(
    dto: CreateDonationDTO,
    user: UserPayload,
  ): Promise<DonationEntity> {
    const donation: DonationEntity = await this.donationRepo.create({ ...dto });
    donation.createdBy = user.id;
    return this.donationRepo.save(donation);
  }

  public async createDonationList(
    list: CreateDonationDTO[],
    user: UserPayload,
  ) {
    return from(list)
      .pipe(
        mergeMap((dto) => this.createDonation(dto, user)),
        toArray(),
      )
      .toPromise();
  }

  private async findOneByID(id: number): Promise<DonationEntity> {
    const donation: DonationEntity = await this.donationRepo.findOneBy({
      id: id,
    });

    if (!donation)
      throw new NotFoundException(`Donation not found by this id = ${id}`);
    return donation;
  }

  private async checkPermission(donation: DonationEntity, user: UserPayload) {
    if (user.id !== donation.donatedBy)
      throw new ForbiddenException(
        "You do not have permission to view this user's donations",
      );
  }

  public async getDonation(
    id: number,
    user: UserPayload,
  ): Promise<DonationEntity> {
    const donation: DonationEntity = await this.findOneByID(id);

    await this.checkPermission(donation, user);

    return donation;
  }

  public async updateDonation(
    id: number,
    dto: UpdateDonationDTO,
    user: UserPayload,
  ): Promise<CommonResponseDTO> {
    const donation: DonationEntity = await this.findOneByID(id);

    await this.checkPermission(donation, user);

    await this.donationRepo.update(
      { id: id },
      { ...dto, lastUpdatedBy: user.id },
    );

    const response: CommonResponseDTO = new CommonResponseDTO(
      true,
      `Updated Successgully`,
    );
    return response;
  }

  public async softDeleteDonation(id: number, user: UserPayload) {
    const donation: DonationEntity = await this.findOneByID(id);

    await this.checkPermission(donation, user);

    await this.donationRepo.update(
      { id: id },
      { lastUpdatedBy: user.id, isActive: false },
    );

    const response: CommonResponseDTO = new CommonResponseDTO(
      true,
      `Deleted Successgully`,
    );
    return response;
  }

  public async getDonationList(
    fromDate: Date,
    toDate: Date,
    currentPage: number,
    perPage: number,
    user: UserPayload,
  ): Promise<DonationEntity[]> {
    if (user.role.role === Roles.ADMIN) {
      return await this.donationRepo.find({
        where: {
          createdAt: Between(fromDate, toDate),
          isActive: true,
        },
        skip: (currentPage - 1) * perPage,
        take: perPage,
        order: {
          createdAt: ORDER.ASC,
        },
      });
    } else if (user.role.role === Roles.DONER) {
      return await this.donationRepo.find({
        where: {
          donatedBy: user.id,
          createdAt: Between(fromDate, toDate),
          isActive: true,
        },
        skip: (currentPage - 1) * perPage,
        take: perPage,
        order: {
          createdAt: ORDER.ASC,
        },
      });
    }
  }
}
