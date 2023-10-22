import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
} from '@nestjs/common';
import { AttributeService } from '../services/attribute.service';
import { CreateAttributeDto } from '../dto/create-attribute.dto';
import { UpdateAttributeDto } from '../dto/update-attribute.dto';
import {
    ApiBody,
    ApiOkResponse,
    ApiOperation,
    ApiQuery,
    ApiTags,
} from '@nestjs/swagger';
import { AttributeQueryFilterDto } from '@src/mec/dto/query/attribute/attribute-filter.dto';
import { GetAttributeDto } from '../dto/get-attribute.dto';
import { AttributeResponseI } from '../interface/get-attribute.interface';

@ApiTags('Attribute')
@Controller('attribute')
export class AttributeController {
    constructor(private readonly attributeService: AttributeService) {}

    @Post('new')
    @ApiOperation({
        summary: 'Create 1 Attribute',
        description: 'Create 1 attribute with its rule',
    })
    @ApiBody({
        type: CreateAttributeDto,
        description: 'Create Attribute & Rule & Option(s)',
        required: true,
    })
    async create(@Body() createAttribute: CreateAttributeDto) {
        return await this.attributeService.create({ createAttribute });
    }

    @Get('query/get')
    @ApiOperation({
        summary: 'Advanced Attribute Filter Query',
        description:
            'Provides all available query filters for Attribute. You can use this to find specific Attribute with its relations. Not All of them are nullable, OrderBy, ColumnName and Value are nullable',
    })
    @ApiQuery({
        name: 'Attribute Query Filter',
        description: 'Provides all available filters',
        type: AttributeQueryFilterDto,
    })
    @ApiOkResponse({
        description: 'Specific Attribute Rule and its details',
        type: [GetAttributeDto],
    })
    async findAttributeQuery(
        @Query() attributeQuery,
    ): Promise<AttributeResponseI> {
        return await this.attributeService.findAttributeQuery({
            attributeQuery,
        });
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
