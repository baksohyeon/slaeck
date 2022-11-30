import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import { JoinRequestDto } from './dto/join.request.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private userRepository: Repository<Users>,
  ) {}

  async getHello(joinRequestDto: JoinRequestDto) {
    const user = await this.userRepository.findOne({
      where: {
        email: joinRequestDto.email,
      },
    });

    if (!user) {
      throw new Error('already taken user info');
    }

    const hashedPassword = await bcrypt.hash(joinRequestDto.password, 10);
    await this.userRepository.save({
      email: joinRequestDto.email,
      nickname: joinRequestDto.nickname,
      password: hashedPassword,
    });
  }
}
