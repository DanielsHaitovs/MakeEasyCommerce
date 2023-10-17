import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { GetAttributeRuleDto } from '@src/attribute/dto/attributes/rule/get-attribute.rule.dto';
import { AttributeResponseI } from '@src/attribute/interfaces/attribute.interface';
import { AttributeService } from '@src/attribute/services/attribute.service';

@ApiTags('Attribute Rule')
@Controller('attribute_rule')
export class AttributeRuleController {
    constructor(private readonly attributeService: AttributeService) {}
    
    @Get('get/one/rule/by/:id')
    @ApiOperation({
        summary: 'Find 1 Attribute Rule by id',
        description: 'Its basically will try to find your attributes Rule.',
    })
    @ApiParam({ name: 'id', description: 'Attribute Data' })
    @ApiOkResponse({
        description: 'Specific Attribute Rule and its details',
        type: GetAttributeRuleDto,
    })
    async findAttributeRule(
        @Param('id') id: number,
    ): Promise<AttributeResponseI> {
        return await this.attributeService.findAttributeRule({ id });
    }


    // Here is missing update
}
