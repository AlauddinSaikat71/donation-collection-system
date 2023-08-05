import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  forwardRef,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserEntity } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { LogInDTO } from './dtos/log-in.dto';
import { LogInResponseDTO } from './dtos/login-response.dto';
import { SignUpDTO } from './dtos/sign-up.dto';
import { SignUpResponseDTO } from './dtos/signup-response.dto';

@Injectable()
export class AccountService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public async signUp(dto: SignUpDTO) {
    const existingUser = await this.userService.searchUserByEmail(dto.email);
    if (existingUser)
      throw new BadRequestException(
        `Already an user exists by this email: ${dto.email}`,
      );

    const newUser: UserEntity = await this.userService.createUser(dto);
    delete newUser.hashPassword;
    const jwtPayload = {
      id: newUser.id,
      email: newUser.email,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      roleId: newUser.roleId,
      role: newUser.role,
    };
    const token = await this.jwtService.sign(jwtPayload);

    const signupResponse: SignUpResponseDTO = new SignUpResponseDTO(
      true,
      'Sign-up Successfull',
    );
    signupResponse.accessToken = token;
    signupResponse.user = newUser;

    return signupResponse;
  }

  public async logIn(dto: LogInDTO): Promise<LogInResponseDTO> {
    const user: UserEntity = await this.validateUser(dto);

    delete user.hashPassword;
    const jwtPayload = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      roleId: user.roleId,
      role: user.role,
    };
    const token = await this.jwtService.sign(jwtPayload);

    const loginResponse: LogInResponseDTO = new LogInResponseDTO(
      true,
      'Log-in Successfull',
    );
    loginResponse.accessToken = token;
    loginResponse.user = user;

    return loginResponse;
  }

  private async validateUser(dto: LogInDTO): Promise<UserEntity> {
    const user: UserEntity = await this.userService.searchUserByEmail(
      dto.email,
    );
    if (!user) {
      throw new NotFoundException(`No user found by this email: ${dto.email}`);
    }

    const isPasswordValid = await bcrypt.compare(
      dto.password,
      user.hashPassword,
    );
    if (!isPasswordValid)
      throw new UnauthorizedException('Incorrect password. Please try again');
    return user;
  }
}
