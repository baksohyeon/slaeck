import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  getHello(nickname: string) {
    return nickname;
  }
}
