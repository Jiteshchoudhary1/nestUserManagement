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
} from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';
import { CreateUserDto, PaginationDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

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
      const data = await this.userService.findAll(queryParams);
      return res.status(HttpStatus.OK).json({
        success: true,
        message: 'user list fetched successfully',
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

  //   @Patch(':id')
  //   async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //     try {
  //       const user = await this.userService.create(createUserDto);
  //       return res.status(HttpStatus.CREATED).json({
  //         success: true,
  //         message: 'user created successfully',
  //         data: user,
  //       });
  //     } catch (error) {
  //       return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
  //         success: false,
  //         message: error.message,
  //         data: null,
  //       });
  //     }
  //   }

  //   @Delete(':id')
  //   remove(@Param('id') id: string) {
  //     try {
  //       const user = await this.userService.create(createUserDto);
  //       return res.status(HttpStatus.CREATED).json({
  //         success: true,
  //         message: 'user created successfully',
  //         data: user,
  //       });
  //     } catch (error) {
  //       return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
  //         success: false,
  //         message: error.message,
  //         data: null,
  //       });
  //     }
  //   }
}
