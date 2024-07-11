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
  ) {}
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
    const today = new Date();
    const where = {};
    if (params.search && params.search != '') {
      where['user_name'] = {
        [Op.iLike]: `%${params.search}%`,
      };
    }
    if (params.min_age && params.max_age) {
      const minBirthDate = new Date(
        today.getFullYear() - params.max_age,
        today.getMonth(),
        today.getDate(),
      );
      const maxBirthDate = new Date(
        today.getFullYear() - params.min_age,
        today.getMonth(),
        today.getDate(),
      );
      where['birth_date'] = {
        [Op.between]: [minBirthDate, maxBirthDate],
      };
    } else if (params.min_age) {
      let minBirthDate = new Date(
        today.getFullYear() - params.min_age,
        today.getMonth(),
        today.getDate(),
      )
        .toISOString()
        .slice(0, 10);
      // minBirthDate = minBirthDate
      console.log('minBirthDate', minBirthDate);
      where['birth_date'] = {
        [Op.gte]: minBirthDate,
      };
    } else if (params.max_age) {
      const minBirthDate = new Date(
        today.getFullYear() - params.max_age,
        today.getMonth(),
        today.getDate(),
      );
      console.log('minBirthDate', minBirthDate);
      where['birth_date'] = {
        [Op.lte]: minBirthDate,
      };
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
