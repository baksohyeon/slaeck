import { Body, Controller, Get, Post } from '@nestjs/common';
import { JoinRequestDto } from './dto/join.request.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getUsers() {
    return;
  }

  @Post()
  postUsers(@Body() data: JoinRequestDto) {
    return this.usersService.getHello(data.nickname);
  }

  @Post('login')
  logIn() {
    return;
  }

  @Post('logout')
  logOut() {
    return;
  }
}
