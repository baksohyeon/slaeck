import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';

import { Users } from '../entities/users.entity';
import { AuthService } from './auth.service';
import { LocalSerializer } from './local-serializer';
import { LocalStrategy } from './local-strategy';

@Module({
  imports: [
    PassportModule.register({ session: true }),
    TypeOrmModule.forFeature([Users]),
  ],
  providers: [AuthService, LocalStrategy, LocalSerializer, UsersService],
})
export class AuthModule {}
