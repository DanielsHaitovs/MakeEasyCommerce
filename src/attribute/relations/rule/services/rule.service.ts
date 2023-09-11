import { Injectable } from '@nestjs/common';
import { UpdateRulesDto } from '../dto/update-rule.dto';
import { CreateRulesDto } from '../dto/post-rule.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { QueryService } from '@src/base/services/query/query.service';
import { Rule } from '../entities/rule.entity';
import {
    OrderedPaginationDto,
    PaginationDto,
} from '@src/base/dto/filter/filters.dto';
import { GetRulesDto } from '../dto/get-rule.dto';
import { RuleResponseDto } from '../dto/rule-base.dto';

@Injectable()
export class RuleService {
    constructor(private readonly queryService: QueryService) {}

    async create({
        createRulesDto,
    }: {
        createRulesDto: CreateRulesDto;
    }): Promise<GetRulesDto | RuleResponseDto> {
        try {
            return await this.queryService.createEntityQuery({
                target: Rule,
                dto: createRulesDto,
                dtoClass: CreateRulesDto,
                getDto: GetRulesDto,
            });
        } catch (e) {
            return {
                result: 'Error saving Rule data',
                error: {
                    message: e.message,
                    in: 'Rule Entity',
                },
            };
        }
    }

    async findAll({
        condition,
    }: {
        condition: OrderedPaginationDto;
    }): Promise<any> {
        // return await this.queryService.findEntityQuery({
        //     entity: Rule,
        //     filters: condition,
        //     dtoClass: GetRulesDto,
        // });

        return null;
    }

    async findOne({
        id,
        condition,
    }: {
        id: number;
        condition: PaginationDto;
    }): Promise<any> {
        return null;
        // return await this.queryService.findByEntityQuery({
        //     entity: Rule,
        //     filters: {
        //         columnName: 'id',
        //         value: id,
        //         ...condition,
        //     },
        //     dtoClass: GetRulesDto,
        // });
    }

    update(id: number, updateRuleDto: UpdateRulesDto) {
        return `This action updates a #${id} rule`;
    }

    remove(id: number) {
        return `This action removes a #${id} rule`;
    }
}
