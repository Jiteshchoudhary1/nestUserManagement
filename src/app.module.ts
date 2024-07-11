import configuration from './config/configuration';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { BlockModule } from './modules/block/block.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './modules/user/entities/user.entity';
const { db_host, db_name, db_password, db_username } =
  configuration.databaseConfig;

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: db_host,
      port: 5432,
      username: db_username,
      password: db_password,
      database: db_name,
      logging: false,
      models: [User],
      autoLoadModels: true,
      synchronize: true,
    }),
    UserModule,
    BlockModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
