import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EavService } from './eav.service';
import { CreateEavDto } from './dto/create-eav.dto';
import { UpdateEavDto } from './dto/update-eav.dto';

@Controller('eav')
export class EavController {
  constructor(private readonly eavService: EavService) {}

  @Post()
  create(@Body() createEavDto: CreateEavDto) {
    return this.eavService.create(createEavDto);
  }

  @Get()
  findAll() {
    return this.eavService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eavService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEavDto: UpdateEavDto) {
    return this.eavService.update(+id, updateEavDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eavService.remove(+id);
  }
}
