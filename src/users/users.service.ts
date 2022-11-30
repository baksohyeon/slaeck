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

  async createUser(joinRequestDto: JoinRequestDto) {
    // const user = await this.userRepository.findOne({
    //   where: {
    //     email: joinRequestDto.email,
    //   },
    // });

    const hashedPassword = await bcrypt.hash(joinRequestDto.password, 10);
    return this.userRepository.save({
      email: joinRequestDto.email,
      nickname: joinRequestDto.nickname,
      password: hashedPassword,
    });
  }

  async findByEmail(email: string): Promise<Users> {
    return this.userRepository.findOne({
      where: { email },
      select: ['id', 'email', 'nickname', 'password'],
    });
  }
}
