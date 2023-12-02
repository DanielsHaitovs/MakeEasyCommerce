import { Injectable } from '@nestjs/common';
import { CreateAttributeDto } from '../dto/create-attribute.dto';
import { UpdateAttributeShortDto } from '../dto/update-attribute.dto';
import {
    AttributeResponseI,
    GetAttributeI,
    GetAttributeShortI,
} from '../interface/attribute.interface';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Attribute } from '../entities/attribute.entity';
import { AttributeHelperService } from '@src/attribute/service/helper/attribute-helper.service';
import { AttributeQueryFilterDto } from '@src/attribute/dto/filter/attribute-filter.dto';

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
            // if (
            //     createAttribute.values === undefined ||
            //     createAttribute == null
            // ) {
            //     const newOptions: AttributeValueI[] =
            //         await this.valueService.createAttributeValues({
            //             attributeId: newAttribute.id,
            //             createValues: createAttribute.values,
            //         });

            //     // if
            //     // newAttribute.values =;
            //     // return {
            //     //     status: '200',
            //     //     message: 'Success',
            //     //     result: newAttribute,
            //     // };
            // }
            // newAttribute.values =  await this.valueHelper.createMany()
        } catch (e) {
            const error = e as Error;

            return {
                status: '666',
                message: 'Ups, Error',
                error: {
                    message: error.message,
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
            const preload: GetAttributeShortI =
                await this.entityManager.preload(Attribute, {
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
            const error = e as Error;
            return {
                status: '666',
                message: 'Ups, Error',
                error: {
                    in: 'Attribute Service',
                    message: error.message,
                },
            };
        }
    }

    async remove({ id }: { id: number }): Promise<AttributeResponseI> {
        try {
            if (id != null) {
                const affected = (
                    await this.entityManager.delete(Attribute, id)
                ).affected;

                if (affected > 0) {
                    return {
                        status: '200',
                        message: 'Success',
                    };
                }
            }

            return {
                status: '666',
                message: 'Ups Error',
                error: {
                    message: 'Could not delete attribute',
                    in: 'Attribute Entity',
                },
            };
        } catch (e) {
            const error = e as Error;
            return {
                status: '666',
                message: 'Ups, Error',
                error: {
                    message: error.message,
                    in: 'Attribute Entity',
                },
            };
        }
    }
}
