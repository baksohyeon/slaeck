import { Module } from '@nestjs/common';
import { WorkspacesService } from './workspaces.service';
import { WorkspacesController } from './workspaces.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workspaces } from 'src-deprecated/entities/workspaces.entity';
import { Channels } from 'src-deprecated/entities/channels.entity';
import { WorkspaceMembers } from 'src-deprecated/entities/workspaceMembers.entity';
import { ChannelMembers } from 'src-deprecated/entities/channelMembers.entity';
import { Users } from 'src-deprecated/entities/users.entity';

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
  providers: [WorkspacesService],
  controllers: [WorkspacesController],
})
export class WorkspacesModule {}
