import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  Res,
  Query,
  Inject,
} from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';
import { CreateUserDto, PaginationDto, SearchDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @ApiOperation({
    description: 'This Api is used to create the user',
  })
  @Post()
  async create(@Res() res: Response, @Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.userService.create(createUserDto);
      return res.status(HttpStatus.CREATED).json({
        success: true,
        message: 'user created successfully',
        data: user,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
        data: null,
      });
    }
  }

  @Get()
  async findAll(@Query() queryParams: PaginationDto, @Res() res: Response) {
    try {
      const key = `findAll${queryParams.limit}${queryParams.page}`;
      let data = await this.cacheManager.get(key);
      if (data) {
        return res.status(HttpStatus.OK).json({
          success: true,
          message: 'user list fetched successfully',
          data: data,
        });
      } else {
        const data = await this.userService.findAll(queryParams);
        await this.cacheManager.set(key, data, 20000);
        return res.status(HttpStatus.OK).json({
          success: true,
          message: 'user list fetched successfully',
          data: data,
        });
      }
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
        data: null,
      });
    }
  }
  @Get('/search')
  async search(@Query() queryParams: SearchDto, @Res() res: Response) {
    try {
      const key = `search${queryParams.limit}${queryParams.page}${queryParams.search}${queryParams.min_age}${queryParams.max_age}`;
      let data = await this.cacheManager.get(key);
      if (data) {
        return res.status(HttpStatus.OK).json({
          success: true,
          message: 'user list fetched successfully',
          data: data,
        });
      } else {
        const data = await this.userService.search(queryParams);
        await this.cacheManager.set(key, data, 10000);
        return res.status(HttpStatus.OK).json({
          success: true,
          message: 'user list fetched successfully',
          data: data,
        });
      }
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
        data: null,
      });
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const data = await this.userService.findOne(+id);
      return res.status(HttpStatus.OK).json({
        success: true,
        message: 'user found successfully',
        data: data,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
        data: null,
      });
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Res() res: Response,
  ) {
    try {
      let isUser = await this.userService.findOne(+id);
      if (!isUser) {
        return res.status(HttpStatus.NOT_FOUND).json({
          success: false,
          data: null,
          message: 'User not found Invalid Id',
        });
      }
      await this.userService.update(isUser, updateUserDto);
      return res.status(HttpStatus.OK).json({
        success: true,
        message: 'user updated successfully',
        data: null,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
        data: null,
      });
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Res() res: Response) {
    try {
      let isUser = await this.userService.findOne(+id);
      if (!isUser) {
        return res.status(HttpStatus.NOT_FOUND).json({
          success: false,
          data: null,
          message: 'User not found Invalid Id',
        });
      }
      await this.userService.remove(isUser);
      return res.status(HttpStatus.OK).json({
        success: true,
        message: 'user deleted successfully',
        data: null,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
        data: null,
      });
    }
  }
}
