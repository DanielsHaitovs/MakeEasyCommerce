import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import {
    CreateProductDto,
    CreateProductShortDto,
} from '@src/product/dto/products/product/create-product.dto';
import { GetProductDto } from '@src/product/dto/products/product/get-product.dto';
import { Product } from '@src/product/entity/product/product.entity';
import { nativeSync } from 'rimraf';
import { EntityManager } from 'typeorm';

@Injectable()
export class ProductService {
    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
    ) {}

    async create({
        createProductDto,
    }: {
        createProductDto: CreateProductDto;
    }): Promise<GetProductDto> {
        return null;
    }

    async createShort({
        createProductDto,
    }: {
        createProductDto: CreateProductShortDto;
    }): Promise<GetProductDto> {
        const newProduct = await this.entityManager.save(
            Product,
            this.entityManager.create(Product, createProductDto),
        );
        return {
            product: null,
            attributes: null,
            ...newProduct,
        };
    }
}
