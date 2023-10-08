import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { StoreAttributeService } from '../services/store-attribute.service';
import { CreateStoreAttributeDto } from '../dto/create-store-attribute.dto';
import { UpdateStoreAttributeDto } from '../dto/update-store-attribute.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { StoreAttributeResponseI } from '../interface/store-attribute.interface';

@ApiTags('Store Attribute')
@Controller('store-attribute')
export class StoreAttributeController {
    constructor(
        private readonly storeAttributeService: StoreAttributeService,
    ) {}

    @Post('new')
    @ApiOperation({
        summary: 'Create 1 Attribute',
        description: 'Create 1 attribute with all data',
    })
    @ApiBody({
        type: CreateStoreAttributeDto,
        description: 'Create Attribute',
        required: true,
    })
    async create(
        @Body() createAttribute: CreateStoreAttributeDto,
    ): Promise<StoreAttributeResponseI> {
        return await this.storeAttributeService.create({ createAttribute });
    }

    @Get()
    findAll() {
        return this.storeAttributeService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.storeAttributeService.findOne(+id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateStoreAttributeDto: UpdateStoreAttributeDto,
    ) {
        return this.storeAttributeService.update(+id, updateStoreAttributeDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.storeAttributeService.remove(+id);
    }
}
