import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChannelMembers } from 'src-deprecated/entities/channelMembers.entity';
import { Channels } from 'src-deprecated/entities/channels.entity';
import { Users } from 'src-deprecated/entities/users.entity';
import { WorkspaceMembers } from 'src-deprecated/entities/workspaceMembers.entity';
import { Workspaces } from 'src-deprecated/entities/workspaces.entity';
import { Repository } from 'typeorm';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';

@Injectable()
export class WorkspacesService {
  constructor(
    @InjectRepository(Workspaces)
    private workspacesRepository: Repository<Workspaces>,
    @InjectRepository(Channels)
    private channelsRepository: Repository<Channels>,
    @InjectRepository(WorkspaceMembers)
    private workspaceMembersRepository: Repository<WorkspaceMembers>,
    @InjectRepository(ChannelMembers)
    private channelMembersRepository: Repository<ChannelMembers>,
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async findById(id: number) {
    return this.workspacesRepository.findOne({ where: { id } });
  }

  async findUserWorkspaces(userId: number) {
    return this.workspacesRepository.find({
      where: {
        WorkspaceMembers: [{ UserId: userId }],
      },
    });
  }

  async createWorkspace(
    createWorkspaceDto: CreateWorkspaceDto,
    userId: number,
  ) {
    const workspace = new Workspaces();
    Object.assign(workspace, createWorkspaceDto);
    workspace.OwnerId = userId;
    const newWorkspace = await this.workspacesRepository.save(workspace);

    const workspaceMember = new WorkspaceMembers();
    workspaceMember.UserId = userId;
    workspaceMember.WorkspaceId = newWorkspace.id;
    // await this.workspaceMembersRepository.save(workspaceMember);

    const channel = new Channels();
    channel.name = 'normal';
    channel.WorkspaceId = newWorkspace.id;

    const [, newChannel] = await Promise.all([
      await this.workspaceMembersRepository.save(workspaceMember),
      await this.channelsRepository.save(channel),
    ]);

    // const newChannel = await this.channelsRepository.save(channel);

    const channelMembers = new ChannelMembers();
    channelMembers.UserId = userId;
    channelMembers.ChannelId = newChannel.id;

    await this.channelsRepository.save(channelMembers);
  }

  async getWorkspaceMembers(url: string) {
    return this.usersRepository
      .createQueryBuilder('user')
      .innerJoin('user.WorkspaceMembers', 'members')
      .innerJoin('members.Workspace', 'workspace', 'workspace.url = :url', {
        url,
      })
      .getMany();
  }

  async createWorkspaceMembers(url, email) {
    const workspace = await this.workspacesRepository.findOne({
      where: { url },
      // relations: ['Channels'], // join 아니면 relation 둘 중 하나만 써야 함
      join: {
        alias: 'workspace', // workspace 테이블 alias
        innerJoinAndSelect: {
          channels: 'workspace.Channels',
        },
      },
    });

    // 쿼리빌더
    this.workspacesRepository
      .createQueryBuilder('workspace') // workspace alias
      .innerJoinAndSelect('workspace.Channels', 'channels')
      .getOne();
  }
}
