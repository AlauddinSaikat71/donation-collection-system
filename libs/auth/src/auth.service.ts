import { Injectable } from '@nestjs/common';
import { isEmpty } from '@nestjs/common/utils/shared.utils';
import { JwtService, JwtSignOptions, JwtVerifyOptions } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  public sign(payload: any, options?: JwtSignOptions) {
    return this.jwtService.signAsync(payload, options);
  }

  public verify(token: string, options?: JwtVerifyOptions) {
    return this.jwtService.verifyAsync(token, options);
  }

  public decode(token: string) {
    return this.jwtService.decode(token);
  }

  public verifyAdmin(user: string, password: string): boolean {
    const adminUsers = [{ user: 'admin', password: 'admin' }];
    const existedUser = isEmpty(adminUsers)
      ? adminUsers
      : (adminUsers as Array<any>).find((x) => x.user === user);

    return existedUser && existedUser.password === password;
  }
}
