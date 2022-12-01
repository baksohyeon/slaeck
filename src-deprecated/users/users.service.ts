import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src-deprecated/entities/users.entity';
import { DataSource, Repository } from 'typeorm';
import { JoinRequestDto } from './dto/join.request.dto';
import * as bcrypt from 'bcrypt';
import { WorkspaceMembers } from 'src-deprecated/entities/workspaceMembers.entity';
import { ChannelMembers } from 'src-deprecated/entities/channelMembers.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
    @InjectRepository(WorkspaceMembers)
    private workspaceMembersRepository: Repository<WorkspaceMembers>,
    @InjectRepository(ChannelMembers)
    private channelMembersRepository: Repository<ChannelMembers>,
    private dataSource: DataSource,
  ) {}

  async createUser(joinRequestDto: JoinRequestDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    queryRunner.startTransaction();
    const user = await this.usersRepository.findOne({
      where: {
        email: joinRequestDto.email,
      },
    });

    if (user) {
      throw new UnauthorizedException('이미 존재하는 사용자입니다.');
    }

    const hashedPassword = await bcrypt.hash(joinRequestDto.password, 10);

    try {
      const newUser = await queryRunner.manager.getRepository(Users).save({
        email: joinRequestDto.email,
        nickname: joinRequestDto.nickname,
        password: hashedPassword,
      });

      await queryRunner.manager.getRepository(WorkspaceMembers).save({
        UserId: newUser.id,
        WorkspaceId: 1,
      });
      await queryRunner.manager.getRepository(ChannelMembers).save({
        UserId: newUser.id,
        ChannelId: 1,
      });
      await queryRunner.commitTransaction();
      return true;
    } catch (e) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async findByEmail(email: string): Promise<Users> {
    return this.usersRepository.findOne({
      where: { email },
      select: ['id', 'email', 'nickname', 'password'],
    });
  }

  async deserializeUser(userId: string, done: CallableFunction) {
    await this.usersRepository
      .findOneOrFail({
        where: { id: +userId },
        select: ['id', 'email', 'nickname'],
        relations: ['Workspaces'],
      })
      .then((user) => {
        console.log('user', user);
        done(null, user);
      })
      .catch((error) => done(error));
  }
}
