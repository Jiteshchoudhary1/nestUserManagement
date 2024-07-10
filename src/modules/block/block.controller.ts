import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BlockService } from './block.service';
import { CreateBlockDto } from './dto/create-block.dto';
import { UpdateBlockDto } from './dto/update-block.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('block')
@Controller('block')
export class BlockController {
  constructor(private readonly blockService: BlockService) {}

  @Post()
  async create(@Body() createBlockDto: CreateBlockDto) {
    return this.blockService.create(createBlockDto);
  }
}
