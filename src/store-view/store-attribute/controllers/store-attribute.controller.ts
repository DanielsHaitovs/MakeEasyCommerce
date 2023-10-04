import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { CreateStoreAttributeDto } from '../dto/create-store-attribute.dto';
import { UpdateStoreAttributeDto } from '../dto/update-store-attribute.dto';
import { StoreAttributeService } from '../services/store-attribute.service';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { StoreAttributeResponseI } from '../interfaces/store-attribute.interface';

@ApiTags('Store View Attribute')
@Controller('store-attribute')
export class StoreAttributeController {
    constructor(private readonly attributeService: StoreAttributeService) {}

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
        return await this.attributeService.create({ createAttribute });
    }

    @Get()
    findAll() {
        return this.attributeService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.attributeService.findOne(+id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateStoreAttributeDto: UpdateStoreAttributeDto,
    ) {
        return this.attributeService.update(+id, updateStoreAttributeDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.attributeService.remove(+id);
    }
}
