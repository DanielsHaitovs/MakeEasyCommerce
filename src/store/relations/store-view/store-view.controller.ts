import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { StoreViewService } from './store-view.service';
import { CreateStoreViewDto } from './dto/create-store-view.dto';
import { UpdateStoreViewDto } from './dto/update-store-view.dto';

@Controller('store-view')
export class StoreViewController {
    constructor(private readonly storeViewService: StoreViewService) {}

    @Post()
    create(@Body() createStoreViewDto: CreateStoreViewDto) {
        return this.storeViewService.create(createStoreViewDto);
    }

    @Get()
    findAll() {
        return this.storeViewService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.storeViewService.findOne(+id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateStoreViewDto: UpdateStoreViewDto,
    ) {
        return this.storeViewService.update(+id, updateStoreViewDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.storeViewService.remove(+id);
    }
}
