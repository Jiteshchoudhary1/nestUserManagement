import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { CreateBlockDto } from './dto/create-block.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from '../user/user.service';
import { Response } from 'express';

@ApiTags('block')
@Controller('block')
export class BlockController {
  constructor(private readonly userService: UserService,) { }

  @ApiOperation({ description: "This api is used to block or unblock the user for both case we use this api" })
  @Post()
  async create(@Res() res: Response, @Body() createBlockDto: CreateBlockDto) {
    try {
      const isUser = await this.userService.findOne(createBlockDto.user_id);
      if (!isUser) {
        return res.status(HttpStatus.NOT_FOUND).json({
          success: false,
          data: null,
          message: "User not found"
        });
      }
      const updateData = { is_block: !isUser.is_block };
      await this.userService.update(isUser, updateData);
      let message = isUser.is_block === true ? 'User successfully unblocked' : 'User successfully blocked';
      return res.status(HttpStatus.OK).json({
        success: true,
        data: null,
        message
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        data: null,
        message: error.message
      });
    }
  }
}
