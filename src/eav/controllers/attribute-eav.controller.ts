import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query,
} from '@nestjs/common';
import {
    ApiBody,
    ApiOkResponse,
    ApiOperation,
    ApiQuery,
    ApiTags,
} from '@nestjs/swagger';
import { AttributeEavService } from '../services/attributes-eav.service';
import {
    CreateAttributeDto,
    AttributeRuleDto,
} from '../dto/attribute/create-eav-attribute.dto';
import { GetAttributeDto } from '../dto/attribute/get-eav-attribute.dto';
import { UpdateAttributeDto } from '../dto/attribute/update-eav-attribute.dto';

@ApiTags('EAV Attributes')
@Controller('attributes')
export class AttributeEavController {
    constructor(private readonly attributeService: AttributeEavService) {}

    @Post('create/new')
    @ApiBody({
        type: CreateAttributeDto,
        description: 'Create Attribute',
        required: true,
    })
    async create(
        @Query('rule') rule: AttributeRuleDto,
        @Body() createAttributeDto: CreateAttributeDto,
    ): Promise<GetAttributeDto> {
        return await this.attributeService.create({
            rule: rule,
            newAttribute: createAttributeDto,
        });
    }

    // This one in future MUST have option
    // filter by page number and amount on page
    // Most likely this will be separate route
    // But this I'll keep for fun (Once I'll generate 1 million baskets) hehe
    @Get('get/all')
    @ApiOperation({
        summary: 'Find All Attributes',
        description: 'Get data of all attributes, good luck!',
    })
    @ApiQuery({
        name: 'findAllRule',
        description: 'include attribute rules data',
        type: 'boolean',
        example: false,
        required: false,
    })
    @ApiQuery({
        name: 'parent',
        description: 'include parent eav data',
        type: 'boolean',
        example: false,
        required: false,
    })
    @ApiOkResponse({
        description: 'Filtered EAV Data',
        // type: [GetParentEavAttributesDto],
    })
    async findAll(
        @Query('findAllRule') rule: boolean,
        @Query('parent') parent: boolean,
    ): Promise<any[]> {
        return await this.attributeService.findAll({
            rule: rule,
            parent: parent,
        });
    }

    @Get('get/:id')
    @ApiOperation({
        summary: 'Find Attribute by ID',
        description: 'Get data for attribute',
    })
    @ApiQuery({
        name: 'findOneRule',
        description: 'include attribute rule data',
        type: 'boolean',
        example: false,
        required: false,
    })
    @ApiQuery({
        name: 'parent',
        description: 'include parent eav data',
        type: 'boolean',
        example: false,
        required: false,
    })
    @ApiOkResponse({
        description: 'Filtered EAV Data',
        // type: [GetParentEavAttributesDto],
    })
    async findOne(
        @Param('id', ParseIntPipe) id: number,
        @Query('findOneRule') rule: boolean,
        @Query('parent') parent: boolean,
    ): Promise<any> {
        return await this.attributeService.findOne({
            id: id,
            rule: rule,
            parent: parent,
        });
    }

    @Patch('update/description/:id')
    @ApiOperation({
        summary: 'Update Attribute description by ID',
        description: 'Update specifically attribute description data by id',
    })
    @ApiBody({
        type: UpdateAttributeDto,
        description: 'Attribute',
        required: true,
    })
    // @ApiQuery({
    //     name: 'updateRule',
    //     description: 'include attribute rules data',
    //     type: AttributeRuleDto,
    //     required: true,
    // })
    async updateAttribute(
        @Param('id') id: string,
        @Query() rule: AttributeRuleDto,
        @Body() updateAttributeDto: UpdateAttributeDto,
    ): Promise<any> {
        return await this.attributeService.update({
            id: +id,
            updateAttributeDto: updateAttributeDto,
            rule: rule,
        });
    }

    @Delete(':id')
    @ApiOperation({
        summary: 'Delete Attribute by ID',
        description: 'Delete specific attribute data by id',
    })
    async removeBasket(@Param('id', ParseIntPipe) id: number): Promise<number> {
        return await this.attributeService.remove({ id: +id });
    }
}
