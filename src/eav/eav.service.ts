import { Injectable } from '@nestjs/common';
import { CreateChildEavDto, CreateEavDto } from './dto/create-eav.dto';
import { UpdateEavDto } from './dto/update-eav.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { EAV } from './entities/eav.entity';
import { GetParentEavDto } from './dto/get-eav.dto';

@Injectable()
export class EavService {
    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
    ) {}
    async create({ createEavDto }: { createEavDto: CreateEavDto }) {
        if (createEavDto.parent != undefined) {
            const parent: GetParentEavDto = await this.entityManager.findOne(
                EAV,
                {
                    where: {
                        id: createEavDto.parent,
                    },
                },
            );
            // There is no parent catalog id
            if (parent.id === undefined) {
                const root = { ...createEavDto.description };
                console.log(root);
                const new_root = await this.entityManager.save(EAV, {
                    children: [],
                    description: root,
                });
                console.log(new_root);
            }

            const test: CreateChildEavDto = this.entityManager.create(EAV, {
                parent: parent,
                description: createEavDto.description,
                children: createEavDto.children,
            });

            console.log('test', test);

            const res = await this.entityManager.save(EAV, test);

            return res;
        }
    }

    async findAll() {
        return await this.entityManager.find(EAV);
    }

    findOne(id: number) {
        return `This action returns a #${id} eav`;
    }

    update(id: number, updateEavDto: UpdateEavDto) {
        return `This action updates a #${id} eav`;
    }

    remove(id: number) {
        return `This action removes a #${id} eav`;
    }
}
