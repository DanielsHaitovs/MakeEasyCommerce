import {
    Body,
    Controller, Post,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateAttributeOptionsDto, CreateOneAttributeOptionDto } from '@src/attribute/dto/attributes/option/create-attribute.option.dto';
import { AttributeOptionService } from '@src/attribute/services/attributes/attribute-option.service';

@ApiTags('Attribute Option(s)')
@Controller('attribute_options')
export class AttributeOptionController {
    constructor(private readonly attributeService: AttributeOptionService) {}
    
    @Post('new/option')
    @ApiOperation({
        summary: 'Create 1 Attribute Option',
        description: 'Create 1 attribute option',
    })
    @ApiBody({
        type: CreateOneAttributeOptionDto,
        description: 'Create Single Attribute Option',
        required: true,
    })
    async createOne(@Body() createAttribute: CreateOneAttributeOptionDto) {
        return await this.attributeService.createOneAttributeOption({ newAttributeOption: createAttribute });
    }

    @Post('new/many/option')
    @ApiOperation({
        summary: 'Create Many Attribute Option',
        description: 'Create many attribute option',
    })
    @ApiBody({
        type: CreateAttributeOptionsDto,
        description: 'Create Many Attribute Option',
        required: true,
    })
    async createMany(@Body() createAttribute: CreateAttributeOptionsDto) {
        return await this.attributeService.createManyAttributeOption({ newAttributeOption: createAttribute });
    }
}
