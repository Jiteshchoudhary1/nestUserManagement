import { Module } from '@nestjs/common';
import { BlockService } from './block.service';
import { BlockController } from './block.controller';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  controllers: [BlockController],
  providers: [BlockService],
})
export class BlockModule {}
