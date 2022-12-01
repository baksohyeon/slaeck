import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { ChannelChats } from './entities/channelChats.entity';
import { ChannelMembers } from './entities/channelMembers.entity';
import { Channels } from './entities/channels.entity';
import { DirectMesseges } from './entities/directMessages.entity';
import { Mentions } from './entities/mentions.entity';
import { Users } from './entities/users.entity';
import { WorkspaceMembers } from './entities/workspaceMembers.entity';
import { Workspaces } from './entities/workspaces.entity';

dotenv.config();

const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
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
