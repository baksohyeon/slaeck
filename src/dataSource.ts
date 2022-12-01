import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { ChannelChats } from '../../slack-backend/src-deprecated/entities/channelChats.entity';
import { ChannelMembers } from '../../slack-backend/src-deprecated/entities/channelMembers.entity';
import { Channels } from '../../slack-backend/src-deprecated/entities/channels.entity';
import { DirectMesseges } from '../../slack-backend/src-deprecated/entities/directMessages.entity';
import { Mentions } from '../../slack-backend/src-deprecated/entities/mentions.entity';
import { Users } from '../../slack-backend/src-deprecated/entities/users.entity';
import { WorkspaceMembers } from '../../slack-backend/src-deprecated/entities/workspaceMembers.entity';
import { Workspaces } from '../../slack-backend/src-deprecated/entities/workspaces.entity';

dotenv.config();

const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT as string),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [
    ChannelChats,
    ChannelMembers,
    Channels,
    DirectMesseges,
    Mentions,
    Users,
    WorkspaceMembers,
    Workspaces,
  ],
  migrations: ['./entities/*.entity{.ts,.js}'],
  charset: 'utf8mb4',
  synchronize: false,
  logging: true,
});

export default dataSource;
