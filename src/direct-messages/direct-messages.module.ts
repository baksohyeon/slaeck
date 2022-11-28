import { Module } from '@nestjs/common';
import { DirectMessagesService } from './direct-messages.service';
import { DirectMessagesController } from './direct-messages.controller';

@Module({
  providers: [DirectMessagesService],
  controllers: [DirectMessagesController]
})
export class DirectMessagesModule {}
