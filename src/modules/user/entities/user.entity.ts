import { BaseEntity } from '@app/common';
import { DonationEntity } from 'src/modules/donation/entities/donation.entity';
import { RoleEntity } from 'src/modules/role/entities/role.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column()
  hashPassword: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  roleId: number;

  @ManyToOne(() => RoleEntity)
  @JoinColumn({ name: 'roleId' })
  role: RoleEntity;

  @OneToMany(() => DonationEntity, (donation: DonationEntity) => donation.user)
  @JoinTable()
  donations: DonationEntity[];
}
