import { ApiGuard } from '@app/auth';
import {
  DCSRequestLogInterceptor,
  DCSValidationPipe,
  SwaggerResponseType,
  TransformInterceptor,
} from '@app/common';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AccountService } from './account.service';
import { LogInDTO } from './dtos/log-in.dto';
import { LogInResponseDTO } from './dtos/login-response.dto';
import { SignUpDTO } from './dtos/sign-up.dto';
import { SignUpResponseDTO } from './dtos/signup-response.dto';

@ApiTags('account')
@Controller('account')
@UsePipes(DCSValidationPipe)
@UseInterceptors(TransformInterceptor, DCSRequestLogInterceptor)
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post('sign-up')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: () => SwaggerResponseType(SignUpResponseDTO) })
  public async signUp(@Body() body: SignUpDTO): Promise<SignUpResponseDTO> {
    return await this.accountService.signUp(body);
  }

  @Post('log-in')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: () => SwaggerResponseType(LogInResponseDTO) })
  public async logIn(@Body() body: LogInDTO): Promise<LogInResponseDTO> {
    return await this.accountService.logIn(body);
  }

  @Get('log-out')
  @ApiGuard()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: () => SwaggerResponseType(Boolean) })
  public async logout() {
    return true;
  }
}
