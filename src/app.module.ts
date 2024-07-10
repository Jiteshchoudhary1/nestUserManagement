import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { BlockModule } from './modules/block/block.module';

@Module({
  imports: [UserModule, BlockModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
