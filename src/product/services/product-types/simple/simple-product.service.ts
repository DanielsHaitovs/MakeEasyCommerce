import { Injectable } from '@nestjs/common';
import { CreateSimpleProductDto } from '@src/product/dto/product-types/create-simple-product.dto';
import { UpdateSimpleProductDto } from '@src/product/dto/product-types/update-simple-product.dto';

@Injectable()
export class SimpleProductService {
    create(createProductDto: CreateSimpleProductDto) {
        return 'This action adds a new product';
    }

    findAll() {
        return `This action returns all product`;
    }

    findOne(id: number) {
        return `This action returns a #${id} product`;
    }

    update(id: number, updateProductDto: UpdateSimpleProductDto) {
        return `This action updates a #${id} product`;
    }

    remove(id: number) {
        return `This action removes a #${id} product`;
    }
}
