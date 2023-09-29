import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { StoreAttributesService } from '../services/store-attributes.service';
import { CreateStoreAttributeDto } from '../dto/create-store-attribute.dto';
import { UpdateStoreAttributeDto } from '../dto/update-store-attribute.dto';

@Controller('store-attributes')
export class StoreAttributesController {
    constructor(
        private readonly storeAttributesService: StoreAttributesService,
    ) {}

    @Post()
    create(@Body() createStoreAttributeDto: CreateStoreAttributeDto) {
        return this.storeAttributesService.create(createStoreAttributeDto);
    }

    @Get()
    findAll() {
        return this.storeAttributesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.storeAttributesService.findOne(+id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateStoreAttributeDto: UpdateStoreAttributeDto,
    ) {
        return this.storeAttributesService.update(+id, updateStoreAttributeDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.storeAttributesService.remove(+id);
    }
}
