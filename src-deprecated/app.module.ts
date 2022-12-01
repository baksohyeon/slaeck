import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { UsersModule } from './users/users.module';
import { WorkspacesModule } from './workspaces/workspaces.module';
import { ChannelsModule } from './channels/channels.module';
import { DirectMessagesModule } from './direct-messages/direct-messages.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { ChannelChats } from './entities/channelChats.entity';
import { ChannelMembers } from './entities/channelMembers.entity';
import { Channels } from './entities/channels.entity';
import { DirectMesseges } from './entities/directMessages.entity';
import { Mentions } from './entities/mentions.entity';
import { Users } from './entities/users.entity';
import { WorkspaceMembers } from './entities/workspaceMembers.entity';
import { Workspaces } from './entities/workspaces.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    WorkspacesModule,
    ChannelsModule,
    DirectMessagesModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      username: process.env.DATABASE_USERNAME,
      port: parseInt(process.env.DATABASE_PORT),
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
      synchronize: false,
      logging: true,
      keepConnectionAlive: true,
      autoLoadEntities: true,
      charset: 'utf8mb4',
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService, AuthService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
