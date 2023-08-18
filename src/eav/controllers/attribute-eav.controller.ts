import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import {
    ApiBody,
    ApiOkResponse,
    ApiOperation,
    ApiQuery,
    ApiTags,
} from '@nestjs/swagger';
import { AttributeEavService } from '../services/attributes-eav.service';
import { GetEavParentDto } from '../dto/get-eav.dto';
import {
    CreateEavAttributeDto,
    EavAttributeRuleDto,
} from '../dto/attribute/create-eav-attribute.dto';
import { GetEavAttributeDto } from '../dto/attribute/get-eav-attribute.dto';

@ApiTags('EAV Attributes')
@Controller('attributes')
export class AttributeEavController {
    constructor(private readonly attributeService: AttributeEavService) {}

    @Post('create/new')
    @ApiQuery({
        name: 'rule',
        description: 'include order customers data',
        type: EavAttributeRuleDto,
        required: true,
    })
    @ApiBody({
        type: CreateEavAttributeDto,
        description: 'Create Attribute',
        required: true,
    })
    async create(
        @Query() rule: EavAttributeRuleDto,
        @Body() createAttributeDto: CreateEavAttributeDto,
    ): Promise<GetEavAttributeDto> {
        return await this.attributeService.create({
            rule: rule,
            newAttribute: createAttributeDto,
        });
    }

    @Get(':id')
    @ApiOkResponse({
        description: 'All Basket and theirs customers',
        type: [GetEavParentDto],
    })
    async findOne(@Param('id') id: string): Promise<GetEavParentDto> {
        return await this.attributeService.findOne(+id);
    }
}

// All Attribute ApiQuery can be done via custom decorator
// @ApiQuery({
//     name: 'Apply for catalog',
//     description: 'Should be used in catalog',
//     type: 'boolean',
//     example: false,
//     required: false,
// })
// @ApiQuery({
//     name: 'Apply for Listing',
//     description: 'Should be used in Listing',
//     type: 'boolean',
//     example: false,
//     required: false,
// })
// @ApiQuery({
//     name: 'Apply for Layered Navigation',
//     description: 'Should be used in Layered Navigation',
//     type: 'boolean',
//     example: false,
//     required: false,
// })
// @ApiQuery({
//     name: 'Apply for filters',
//     description: 'Should be used in filtering',
//     type: 'boolean',
//     example: false,
//     required: false,
// })
// @ApiQuery({
//     name: 'Apply for options filters',
//     description: 'Should be used in options filter',
//     type: 'boolean',
//     example: false,
//     required: false,
// })
// @ApiQuery({
//     name: 'Apply for sorting',
//     description: 'Should be used in sorting',
//     type: 'boolean',
//     example: false,
//     required: false,
// })
// @ApiQuery({
//     name: 'Apply for search',
//     description: 'Should be used in search',
//     type: 'boolean',
//     example: false,
//     required: false,
// })
// @ApiQuery({
//     name: 'Apply for promo',
//     description: 'Should be used in Promo',
//     type: 'boolean',
//     example: false,
//     required: false,
// })
// @ApiQuery({
//     name: 'Apply for report',
//     description: 'Should be used in report',
//     type: 'boolean',
//     example: false,
//     required: false,
// })
// @ApiBody({
//     type: CreateEavAttributeShortDto,
//     description: 'Create Attribute',
//     required: true,
// })
// async create(
//     @Query('useInCatalog') useInCatalog: boolean,
//     @Query('useInListing') useInListing: boolean,
//     @Query('useInLayeredNavigation') useInLayeredNavigation: boolean,
//     @Query('useInFilter') useInFilter: boolean,
//     @Query('useInOptionFilter') useInOptionFilter: boolean,
//     @Query('useInSort') useInSort: boolean,
//     @Query('useInSearch') useInSearch: boolean,
//     @Query('useInPromo') useInPromo: boolean,
//     @Query('useInReport') useInReport: boolean,
//     @Body() createAttributeDto: CreateEavAttributeShortDto,
// ): Promise<any> {
//     return await this.attributeService.create({
//         createAttributeEavShortDto: createAttributeDto,
//         useInCatalog: useInCatalog,
//         useInListing: useInListing,
//         useInLayeredNavigation: useInLayeredNavigation,
//         useInFilter: useInFilter,
//         useInOptionFilter: useInOptionFilter,
//         useInSort: useInSort,
//         useInSearch: useInSearch,
//         useInPromo: useInPromo,
//         useInReport: useInReport,
//     });
// }
