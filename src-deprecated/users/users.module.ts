import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src-deprecated/entities/users.entity';
import { WorkspaceMembers } from 'src-deprecated/entities/workspaceMembers.entity';
import { ChannelMembers } from 'src-deprecated/entities/channelMembers.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users, WorkspaceMembers, ChannelMembers]),
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
