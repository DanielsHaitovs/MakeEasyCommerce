import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { CreateOptionDto } from '../dto/create-option.dto';
import { UpdateOptionDto } from '../dto/update-option.dto';
import { OptionService } from '../services/option.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('option')
@ApiTags('Option')
export class OptionController {
    constructor(private readonly optionService: OptionService) {}

    @Post()
    create(@Body() createOptionDto: CreateOptionDto) {
        return this.optionService.create(createOptionDto);
    }

    @Get()
    findAll() {
        return this.optionService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.optionService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateOptionDto: UpdateOptionDto) {
        return this.optionService.update(+id, updateOptionDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.optionService.remove(+id);
    }
}
