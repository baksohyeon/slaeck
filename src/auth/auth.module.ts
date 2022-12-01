import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';

import { AuthService } from './auth.service';
import { LocalSerializer } from './local-serializer';
import { LocalStrategy } from './local-strategy';

@Module({
  imports: [PassportModule.register({ session: true }), UsersModule],
  providers: [AuthService, LocalStrategy, LocalSerializer],
})
export class AuthModule {}
