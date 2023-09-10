// import { Injectable } from '@nestjs/common';
// import { InjectEntityManager } from '@nestjs/typeorm';
// import { EntityManager } from 'typeorm';

// @Injectable()
// export class SimpleProductService {
//     constructor(
//         @InjectEntityManager()
//         private readonly entityManager: EntityManager,
//     ) {}

//     async create({
//         createProductDto,
//     }: {
//         createProductDto: CreateSimpleProductDto;
//     }): Promise<GetProductDto> {
//         console.log(createProductDto.productType);
//         return null;
//     }

//     findAll() {
//         return null;
//     }

//     findOne(id: number) {
//         console.log(id);
//         return null;
//     }

//     update(id: number, updateProductDto: UpdateSimpleProductDto) {
//         console.log(id);
//         console.log(updateProductDto.productType);
//         return null;
//     }

//     remove(id: number) {
//         console.log(id);
//         return null;
//     }
// }
