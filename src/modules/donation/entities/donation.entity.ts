import { BaseEntity } from '@app/common';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { TRASFERRED_VIA_ENUM } from '../enums/via.enum';

@Entity({ name: 'donations' })
export class DonationEntity extends BaseEntity {
  @Column()
  donatedBy: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'donatedBy' })
  user: UserEntity;

  @Column()
  amount: number;

  @Column({ type: 'enum', enum: TRASFERRED_VIA_ENUM })
  transferredVia: TRASFERRED_VIA_ENUM;
}
