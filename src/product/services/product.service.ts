import { Injectable } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import {
    ProductError,
    ProductSuccess,
} from '../dto/requests/product-response.dto';

@Injectable()
export class ProductService {
    async create({
        createProductDto,
    }: {
        createProductDto: CreateProductDto;
    }): Promise<ProductError | ProductSuccess> {
        return {
            status: 200,
            result: [createProductDto],
        };
    }

    findAll() {
        return `This action returns all product`;
    }

    findOne(id: number) {
        return `This action returns a #${id} product`;
    }

    update(id: number, updateProductDto: UpdateProductDto) {
        return updateProductDto;
    }

    remove(id: number) {
        return `This action removes a #${id} product`;
    }
}
