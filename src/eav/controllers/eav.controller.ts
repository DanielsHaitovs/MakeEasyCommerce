import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { EavService } from '../services/eav.service';
import { UpdateEavDto } from '../dto/update-eav.dto';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateEavDto } from '../dto/create-eav.dto';
import { GetEavParentDto } from '../dto/get-eav.dto';

@ApiTags('EAV')
@Controller('eav')
export class EavController {
    constructor(private readonly eavService: EavService) {}

    @Post('new')
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
    @ApiOkResponse({
        description: 'All Basket and theirs customers',
        type: [GetEavParentDto],
    })
    async findOne(@Param('id') id: string): Promise<GetEavParentDto> {
        return await this.eavService.findOne(+id);
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
