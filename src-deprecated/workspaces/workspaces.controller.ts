import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src-deprecated/common/decorators/user.decorator';
import { Users } from 'src-deprecated/entities/users.entity';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { WorkspacesService } from './workspaces.service';

@ApiTags('WORKSPACE')
@Controller('workspaces')
export class WorkspacesController {
  constructor(private readonly workspacesService: WorkspacesService) {}
  @Get()
  getUserWorkspaces(@User() user: Users) {
    return this.workspacesService.findUserWorkspaces(user.id);
  }

  @Post()
  createWorkspaces(
    @User() user: Users,
    createWorkspaceDto: CreateWorkspaceDto,
  ) {
    return this.workspacesService.createWorkspace(createWorkspaceDto, user.id);
  }

  @Get(':url/members')
  getAllMembersFromWorkspace() {}

  @Post(':url/members')
  inviteMembersToWorkspace() {}

  @Delete(':url/members/:id')
  kickMemberFromWorkspace() {}

  @Get(':url/members/:id')
  getMemberInfoWorkspace() {}
}
