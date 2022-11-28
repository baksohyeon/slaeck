import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JoinRequestDto } from './dto/join.request.dto';
import { UsersService } from './users.service';

@ApiTags('USER')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: '내 정보 조회' })
  @Get()
  getUsers() {
    return;
  }

  @ApiOperation({ summary: '회원 가입' })
  @Post()
  postUsers(@Body() data: JoinRequestDto) {
    return this.usersService.getHello(data.nickname);
  }

  @ApiOperation({ summary: '로그인' })
  @Post('login')
  logIn() {
    return;
  }

  @ApiOperation({ summary: '로그아웃' })
  @Post('logout')
  logOut() {
    return;
  }
}
