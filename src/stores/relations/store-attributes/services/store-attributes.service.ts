import { Injectable } from '@nestjs/common';
import { CreateStoreAttributeDto } from '../dto/create-store-attribute.dto';
import { UpdateStoreAttributeDto } from '../dto/update-store-attribute.dto';

@Injectable()
export class StoreAttributesService {
    create(createStoreAttributeDto: CreateStoreAttributeDto) {
        return 'This action adds a new storeAttribute';
    }

    findAll() {
        return `This action returns all storeAttributes`;
    }

    findOne(id: number) {
        return `This action returns a #${id} storeAttribute`;
    }

    update(id: number, updateStoreAttributeDto: UpdateStoreAttributeDto) {
        return `This action updates a #${id} storeAttribute`;
    }

    remove(id: number) {
        return `This action removes a #${id} storeAttribute`;
    }
}
