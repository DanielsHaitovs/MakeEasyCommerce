import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { GetProductDto } from '@src/product/dto/products/product/get-product.dto';
import { CreateSimpleProductDto } from '@src/product/dto/products/type/simple/create-simple.product.dto';
import { UpdateSimpleProductDto } from '@src/product/dto/products/type/simple/update-simple.product.dto';
import { EntityManager } from 'typeorm';

@Injectable()
export class SimpleProductService {
    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
    ) {}

    async create({
        createProductDto,
    }: {
        createProductDto: CreateSimpleProductDto;
    }): Promise<GetProductDto> {
        console.log(createProductDto.productType);
        return null;
    }

    findAll() {
        return null;
    }

    findOne(id: number) {
        console.log(id);
        return null;
    }

    update(id: number, updateProductDto: UpdateSimpleProductDto) {
        console.log(id);
        console.log(updateProductDto.productType);
        return null;
    }

    remove(id: number) {
        console.log(id);
        return null;
    }
}
