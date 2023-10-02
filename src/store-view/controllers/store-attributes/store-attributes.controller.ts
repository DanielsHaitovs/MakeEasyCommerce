import { Controller, Post, Body } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateStoreAttributeShortDto } from '@src/store-view/dto/attributes/create-attribute.dto';
import { StoreViewAttributeResponseI } from '@src/store-view/interfaces/store-attributes/store-attributes.interface';
import { StoreViewAttributesService } from '@src/store-view/services/store-attributes/store-attributes.service';

@ApiTags('Store View Attributes')
@Controller('store_view_attributes')
export class StoreViewAttributesController {
    constructor(
        private readonly attributesService: StoreViewAttributesService,
    ) {}

    @Post('new')
    @ApiOperation({
        summary: 'Create Store View Attribute Short',
        description:
            'Creates record (specifically) for store view Attribute entity',
    })
    @ApiBody({
        type: CreateStoreAttributeShortDto,
        description: 'Create Store View Attribute Short',
        required: true,
    })
    async create(
        @Body() createAttributeDto: CreateStoreAttributeShortDto,
    ): Promise<StoreViewAttributeResponseI> {
        return this.attributesService.createShort({ createAttributeDto });
    }
}
