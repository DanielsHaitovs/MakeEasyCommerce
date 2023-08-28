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
import { AttributeService } from './attribute.service';
import { CreateAttributeDto } from './dto/create-attribute.dto';
import { UpdateAttributeDto } from './dto/update-attribute.dto';
import {
    ApiBody,
    ApiOkResponse,
    ApiOperation,
    ApiParam,
    ApiQuery,
    ApiTags,
} from '@nestjs/swagger';
import { GetAttributeDto } from './dto/get-attribute.dto';

@Controller('attribute')
@ApiTags('Attribute')
export class AttributeController {
    constructor(private readonly attributeService: AttributeService) {}

    @Post('new')
    @ApiOperation({
        summary: 'Create Attribute',
        description: 'Create (specifically) attribute entity',
    })
    @ApiBody({
        type: CreateAttributeDto,
        description: 'Create Attribute',
        required: true,
    })
    async create(
        @Body() createAttributeDto: CreateAttributeDto,
    ): Promise<GetAttributeDto> {
        return await this.attributeService.create({
            createAttributeDto: createAttributeDto,
        });
    }

    @Get('get/all')
    @ApiOperation({
        summary: 'Find All Attributes',
        description: 'Get data of all Attributes, good luck!',
    })
    @ApiQuery({
        name: 'Attribute Rules',
        description:
            'Its basically setting on how attribute will work in backend and front end',
        type: 'boolean',
        example: false,
        required: false,
    })
    @ApiQuery({
        name: 'Attribute Option Values',
        description: 'This will return attribute options values',
        type: 'boolean',
        example: false,
        required: false,
    })
    @ApiOkResponse({
        description: 'All Attributes and theirs details',
        type: [GetAttributeDto],
    })
    async findAll(
        @Query('Attribute Rules') attributeRule: boolean,
        @Query('Attribute Option Values') optionsData: boolean,
    ) {
        return await this.attributeService.findAll({
            attributeRule: attributeRule,
            optionsData: optionsData,
        });
    }

    @Get('get/by/:id')
    @ApiOperation({
        summary: 'Find One Attribute by ID',
        description: 'Get data of 1 specific Attribute, good luck!',
    })
    @ApiParam({ name: 'id', description: 'attribute id' })
    @ApiQuery({
        name: 'Attribute Rules',
        description:
            'Its basically setting on how attribute will work in backend and front end',
        type: 'boolean',
        example: false,
        required: false,
    })
    @ApiQuery({
        name: 'Attribute Option Values',
        description: 'This will return attribute options values',
        type: 'boolean',
        example: false,
        required: false,
    })
    @ApiOkResponse({
        description: 'All Attributes and theirs details',
        type: [GetAttributeDto],
    })
    async findOneById(
        @Param('id') id: number,
        @Query('Attribute Rules') attributeRule: boolean,
        @Query('Attribute Option Values') optionsData: boolean,
    ) {
        return await this.attributeService.findOneById({
            id: id,
            attributeRule: attributeRule,
            optionsData: optionsData,
        });
    }

    @Get('get/by/attribute/:code')
    @ApiOperation({
        summary: 'Find One Attribute by attribute code',
        description: 'Get data of 1 specific Attribute, good luck!',
    })
    @ApiQuery({
        name: 'Attribute code name',
        description:
            'Its basically will try to find your attribute by mentioned code',
        type: String,
        example: 'name',
        required: true,
    })
    @ApiQuery({
        name: 'Attribute code value',
        description:
            'Its basically will try to find your attribute by mentioned code and this value',
        type: String,
        example: 'test',
        required: true,
    })
    @ApiQuery({
        name: 'Attribute Rules',
        description:
            'Its basically setting on how attribute will work in backend and front end',
        type: 'boolean',
        example: false,
        required: false,
    })
    @ApiQuery({
        name: 'Attribute Option Values',
        description: 'This will return attribute options values',
        type: 'boolean',
        example: false,
        required: false,
    })
    @ApiOkResponse({
        description: 'All Attributes and theirs details',
        type: [GetAttributeDto],
    })
    async findOneBy(
        @Query('Attribute code name') attributeCode: string,
        @Query('Attribute code value') attributeValue: string,
        @Query('Attribute Rules') attributeRule: boolean,
        @Query('Attribute Option Values') optionsData: boolean,
    ) {
        return await this.attributeService.findOneBy({
            code: attributeCode,
            value: attributeValue,
            attributeRule: attributeRule,
            optionsData: optionsData,
        });
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
