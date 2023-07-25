import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { EavService } from './eav.service';
import { UpdateEavDto } from './dto/update-eav.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateEavDto } from './dto/create-eav.dto';

@ApiTags('EAV')
@Controller('eav')
export class EavController {
    constructor(private readonly eavService: EavService) {}

    @Post()
    @ApiOperation({
        summary: 'Create EAV',
        description: 'Create (specifically) eav entity',
    })
    @ApiBody({
        type: CreateEavDto,
        description: 'Create EAV',
        required: true,
    })
    async create(@Body() createEavDto: CreateEavDto) {
        return await this.eavService.create({
            createEavDto: createEavDto,
        });
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
