import { Injectable } from '@nestjs/common';
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
        raw: true,
        nest: true,
      });
    } else {
      return await this.userRepository.findAndCountAll({
        where: { is_block: false },
        raw: true,
        nest: true,
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
    const where = { is_block: false };
    if (params.search && params.search != '') {
      where['user_name'] = {
        [Op.iLike]: `%${params.search}%`,
      };
    }
    const today = new Date();
    const minBirthDate = params.max_age
      ? new Date(
          today.getFullYear() - params.max_age,
          today.getMonth(),
          today.getDate(),
        )
          .toISOString()
          .slice(0, 10)
      : null;

    const maxBirthDate = params.min_age
      ? new Date(
          today.getFullYear() - params.min_age,
          today.getMonth(),
          today.getDate(),
        )
          .toISOString()
          .slice(0, 10)
      : null;
    if (minBirthDate && maxBirthDate) {
      where['birth_date'] = {
        [Op.between]: [minBirthDate, maxBirthDate],
      };
    } else if (minBirthDate) {
      where['birth_date'] = {
        [Op.gte]: minBirthDate,
      };
    } else if (maxBirthDate) {
      where['birth_date'] = {
        [Op.lte]: maxBirthDate,
      };
    }
    if (params.page && params.limit) {
      const page = Number(params.page) || 1;
      const limit = Number(params.limit) || 10;
      const offset = (page - 1) * limit;
      return await this.userRepository.findAndCountAll({
        where,
        offset,
        limit,
      });
    } else {
      return await this.userRepository.findAndCountAll({
        where,
      });
    }
  }
}
