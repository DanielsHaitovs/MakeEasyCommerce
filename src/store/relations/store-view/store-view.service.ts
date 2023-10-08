import { Injectable } from '@nestjs/common';
import { CreateStoreViewDto } from './dto/create-store-view.dto';
import { UpdateStoreViewDto } from './dto/update-store-view.dto';

@Injectable()
export class StoreViewService {
    create(createStoreViewDto: CreateStoreViewDto) {
        return 'This action adds a new storeView';
    }

    findAll() {
        return `This action returns all storeView`;
    }

    findOne(id: number) {
        return `This action returns a #${id} storeView`;
    }

    update(id: number, updateStoreViewDto: UpdateStoreViewDto) {
        return `This action updates a #${id} storeView`;
    }

    remove(id: number) {
        return `This action removes a #${id} storeView`;
    }
}
