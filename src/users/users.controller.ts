import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from 'src/auth/guard/local-auth.guard';
import { JoinRequestDto } from './dto/join.request.dto';
import { UsersService } from './users.service';

@ApiTags('USER')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: '내 정보 조회' })
  @Get()
  async getUsers() {
    return 'hello';
  }

  @ApiOperation({ summary: '회원 가입' })
  @Post()
  async login(@Body() joinRequestDto: JoinRequestDto) {
    return this.usersService.createUser(joinRequestDto);
  }

  // @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: '로그인' })
  @Post('login')
  async logIn(@Body() joinRequestDto: JoinRequestDto) {
    return 0;
  }

  @ApiOperation({ summary: '로그아웃' })
  @Post('logout')
  logOut() {
    return;
  }
}
