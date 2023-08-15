import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AttributeEavService } from '../services/attributes-eav.service';
import { CreateEavAttribute } from '../dto/attribute/create-eav-attribute.dto';

@ApiTags('EAV Attributes')
@Controller('attributes')
export class AttributeEavController {
    constructor(private readonly attributeService: AttributeEavService) {}

    @Post('new')
    @ApiOperation({
        summary: 'Create Attribute',
        description:
            'This will create new attribute under specific EAV group record',
    })
    // All Attribute ApiQuery can be done via custom decorator
    @ApiQuery({
        name: 'Apply for catalog',
        description: 'Should be used in catalog',
        type: 'boolean',
        example: false,
        required: false,
    })
    @ApiQuery({
        name: 'Apply for Listing',
        description: 'Should be used in Listing',
        type: 'boolean',
        example: false,
        required: false,
    })
    @ApiQuery({
        name: 'Apply for Layered Navigation',
        description: 'Should be used in Layered Navigation',
        type: 'boolean',
        example: false,
        required: false,
    })
    @ApiQuery({
        name: 'Apply for filters',
        description: 'Should be used in filtering',
        type: 'boolean',
        example: false,
        required: false,
    })
    @ApiQuery({
        name: 'Apply for options filters',
        description: 'Should be used in options filter',
        type: 'boolean',
        example: false,
        required: false,
    })
    @ApiQuery({
        name: 'Apply for sorting',
        description: 'Should be used in sorting',
        type: 'boolean',
        example: false,
        required: false,
    })
    @ApiQuery({
        name: 'Apply for search',
        description: 'Should be used in search',
        type: 'boolean',
        example: false,
        required: false,
    })
    @ApiQuery({
        name: 'Apply for promo',
        description: 'Should be used in Promo',
        type: 'boolean',
        example: false,
        required: false,
    })
    @ApiQuery({
        name: 'Apply for report',
        description: 'Should be used in report',
        type: 'boolean',
        example: false,
        required: false,
    })
    @ApiBody({
        type: CreateEavAttribute,
        description: 'Create Attribute',
        required: true,
    })
    async create(@Body() createAttributeDto: CreateEavAttribute) {
        return await this.attributeService.create({
            createAttributeEavDto: createAttributeDto,
        });
    }
}
