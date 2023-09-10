// import { Injectable } from '@nestjs/common';
// import { InjectEntityManager } from '@nestjs/typeorm';
// import { Product } from '@src/product/entity/product/product.entity';
// import { EntityManager } from 'typeorm';

// @Injectable()
// export class ProductService {
//     constructor(
//         @InjectEntityManager()
//         private readonly entityManager: EntityManager,
//     ) {}

//     async create({
//         createProductDto,
//     }: {
//         createProductDto: CreateProductDto;
//     }): Promise<GetProductDto> {
//         console.log(createProductDto.productType);
//         return null;
//     }

//     async createShort({
//         createProductDto,
//     }: {
//         createProductDto: CreateProductShortDto;
//     }): Promise<GetProductDto> {
//         const newProduct = await this.entityManager.save(
//             Product,
//             this.entityManager.create(Product, createProductDto),
//         );
//         return {
//             product: null,
//             attributes: null,
//             ...newProduct,
//         };
//     }

//     findAll() {
//         return null;
//     }

//     findOne(id: number) {
//         console.log(id);
//         return null;
//     }

//     update(id: number, updateProductDto: UpdateProductDto) {
//         console.log(id);
//         console.log(updateProductDto.productType);
//         return null;
//     }

//     remove(id: number) {
//         console.log(id);
//         return null;
//     }
// }
