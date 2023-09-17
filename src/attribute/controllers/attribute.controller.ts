import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { AttributeService } from '../services/attribute.service';
import {
    CreateAttributeDto,
    CreateAttributeShortDto,
} from '../dto/create-attribute.dto';
import { UpdateAttributeDto } from '../dto/update-attribute.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AttributeResponseInterface } from '../interfaces/attribute.interface';

@Controller('attribute')
@ApiTags('Attribute')
export class AttributeController {
    constructor(private readonly attributeService: AttributeService) {}

    @Post('short/new')
    @ApiOperation({
        summary: 'Create 1 Attribute Short',
        description: 'Create 1 attribute only with description',
    })
    @ApiBody({
        type: CreateAttributeShortDto,
        description: 'Create Attribute Short',
        required: true,
    })
    async createShort(
        @Body() createAttribute: CreateAttributeShortDto,
    ): Promise<AttributeResponseInterface> {
        return await this.attributeService.createShort({ createAttribute });
    }

    @Post('new')
    @ApiOperation({
        summary: 'Create 1 Attribute',
        description: 'Create 1 attribute with all data',
    })
    @ApiBody({
        type: CreateAttributeDto,
        description: 'Create Attribute',
        required: true,
    })
    async create(
        @Body() createAttribute: CreateAttributeDto,
    ): Promise<AttributeResponseInterface> {
        return await this.attributeService.create({ createAttribute });
    }

    @Get()
    findAll() {
        return this.attributeService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.attributeService.findOne(+id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateAttributeDto: UpdateAttributeDto,
    ) {
        return this.attributeService.update(+id, updateAttributeDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.attributeService.remove(+id);
    }
}
