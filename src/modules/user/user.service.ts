import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { Op } from 'sequelize';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly userRepository: typeof User,
  ) { }
  async create(createUserDto: any) {
    return await this.userRepository.create(createUserDto);
  }

  async findAll(params: any) {
    if (params.page && params.limit) {
      const page = Number(params.page) || 1;
      const limit = Number(params.limit) || 10;
      const offset = (page - 1) * limit;
      return await this.userRepository.findAndCountAll({
        where: {
          is_block: false,
        },
        offset,
        limit,
      });
    } else {
      return await this.userRepository.findAndCountAll({
        where: { is_block: false },
      });
    }
  }

  async findOne(id: number) {
    return await this.userRepository.findOne({ where: { id } });
  }

  async update(userObj: User, updateUserDto: any) {
    return await userObj.update(updateUserDto);
  }

  async remove(userObj: User) {
    return userObj.destroy();
  }

  async search(params: any) {
    const where = {};
    if (params.search && params.search != '') {
      where['username'] = {
        [Op.iLike]: `%${params.search}%`
      }
    }
    // if (params)
    if (params.page && params.limit) {
      const page = Number(params.page) || 1;
      const limit = Number(params.limit) || 10;
      const offset = (page - 1) * limit;
      return await this.userRepository.findAndCountAll({
        where: {
          is_block: false,
        },
        offset,
        limit,
      });
    } else {
      return await this.userRepository.findAndCountAll({
        where: { is_block: false },
      });
    }
  }
}
