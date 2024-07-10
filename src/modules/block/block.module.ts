import { Module } from '@nestjs/common';
import { BlockController } from './block.controller';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  controllers: [BlockController],
})
export class BlockModule { }
