import { Module } from '@nestjs/common';
import { ChannelsService } from './channels.service';
import { ChannelsController } from './channels.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChannelMembers } from 'src-deprecated/entities/channelMembers.entity';
import { Channels } from 'src-deprecated/entities/channels.entity';
import { Users } from 'src-deprecated/entities/users.entity';
import { WorkspaceMembers } from 'src-deprecated/entities/workspaceMembers.entity';
import { Workspaces } from 'src-deprecated/entities/workspaces.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Users,
      Workspaces,
      Channels,
      WorkspaceMembers,
      ChannelMembers,
    ]),
  ],
  providers: [ChannelsService],
  controllers: [ChannelsController],
})
export class ChannelsModule {}
