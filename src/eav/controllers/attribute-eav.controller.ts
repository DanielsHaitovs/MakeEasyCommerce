import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
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
