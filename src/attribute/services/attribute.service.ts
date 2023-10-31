import { Injectable } from '@nestjs/common';
import { CreateAttributeDto } from '../dto/create-attribute.dto';
import { UpdateAttributeShortDto } from '../dto/update-attribute.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import {
    AttributeResponseI,
    GetAttributeI,
} from '../interface/get-attribute.interface';
import { AttributeHelperService } from '@src/mec/services/attribute/attribute-helper.service';
import { Attribute } from '../entities/attribute.entity';
import { AttributeQueryFilterDto } from '@src/mec/dto/query/attribute/attribute-filter.dto';

@Injectable()
export class AttributeService {
    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
        private readonly attributeHelper: AttributeHelperService,
    ) {}

    async create({
        createAttribute,
    }: {
        createAttribute: CreateAttributeDto;
    }): Promise<AttributeResponseI> {
        const check = await this.attributeHelper.ifExists({
            name: createAttribute.name,
            code: createAttribute.code,
        });
        if (check) {
            return {
                status: '770',
                message: 'Duplicate',
                error: {
                    message: 'Attribute already exists',
                    in: 'Attribute Entity',
                },
            };
        }
        try {
            const newAttribute: GetAttributeI = await this.entityManager.save(
                Attribute,
                this.attributeHelper.prepareAttribute({ createAttribute }),
            );

            if (newAttribute === null) {
                return {
                    status: '666',
                    message: 'Options are empty',
                    error: {
                        in: 'Attribute Service',
                        message: 'Could not save attribute',
                    },
                };
            }

            return {
                status: '200',
                message: 'Success',
                result: newAttribute,
            };
        } catch (e) {
            return {
                status: '666',
                message: 'Ups, Error',
                error: {
                    message: e.message,
                    in: 'Attribute Service',
                },
            };
        }
    }

    async findAttributeQuery({
        attributeQuery,
    }: {
        attributeQuery: AttributeQueryFilterDto;
    }): Promise<AttributeResponseI> {
        console.log(attributeQuery);
        return await this.attributeHelper.attributeQuery({
            filters: { ...attributeQuery },
        });
    }

    async update({
        id,
        attribute,
    }: {
        id: number;
        attribute: UpdateAttributeShortDto;
    }): Promise<AttributeResponseI> {
        try {
            const preload = await this.entityManager.preload(Attribute, {
                id: id,
            });

            if (
                preload.code != attribute.code ||
                preload.name != attribute.name
            ) {
                const check = await this.attributeHelper.ifExists({
                    name: attribute.name,
                    code: attribute.code,
                });
                if (check) {
                    return {
                        status: '770',
                        message: 'Duplicate',
                        error: {
                            message:
                                'Attribute code or name already exist already exists',
                            in: 'Attribute Entity',
                        },
                    };
                }
            }

            const affected = (
                await this.entityManager.update(Attribute, id, attribute)
            ).affected;

            if (affected > 0) {
                return {
                    status: '200',
                    message: 'Success',
                    result: [],
                };
            }
            return {
                status: '666',
                message: 'Ups, Error',
                result: preload,
                error: {
                    in: 'Attribute Service',
                    message: 'Could not update this records',
                },
            };
        } catch (e) {
            return {
                status: '666',
                message: 'Ups, Error',
                error: {
                    in: 'Attribute Service',
                    message: e.message,
                },
            };
        }
    }

    remove(id: number) {
        return `This action removes a #${id} attribute`;
    }
}
