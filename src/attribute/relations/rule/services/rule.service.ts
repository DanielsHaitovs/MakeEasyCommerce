import { Injectable } from '@nestjs/common';
import { UpdateRulesDto } from '../dto/update-rule.dto';
import { CreateRulesDto } from '../dto/post-rule.dto';
import { QueryService } from '@src/base/services/query/query.service';
import { Rule } from '../entities/rule.entity';
import {
    OrderedPaginationDto,
    SimpleFilterDto,
} from '@src/base/dto/filter/filters.dto';
import { GetRulesDto } from '../dto/get-rule.dto';
import { RuleResponseDto } from '../dto/rule-base.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class RuleService {
    constructor(private readonly queryService: QueryService) {}

    async create({
        createRulesDto,
    }: {
        createRulesDto: CreateRulesDto;
    }): Promise<RuleResponseDto> {
        try {
            return {
                result: plainToClass(
                    GetRulesDto,
                    await this.queryService.createEntityQuery({
                        target: Rule,
                        dto: createRulesDto,
                        dtoClass: CreateRulesDto,
                        getDto: GetRulesDto,
                    }),
                ),
            };
        } catch (e) {
            return {
                error: {
                    message: e.message,
                    in: 'Rule Entity',
                },
            };
        }
    }

    async findOne({
        condition,
    }: {
        condition: SimpleFilterDto;
    }): Promise<RuleResponseDto> {
        return {
            result: plainToClass(
                GetRulesDto,
                await this.queryService.findEntityByQuery({
                    entity: Rule,
                    getDto: GetRulesDto,
                    dtoClass: GetRulesDto,
                    filters: {
                        page: 1,
                        limit: 0,
                        orderBy: '',
                        type: 'ASC',
                        columnName: condition.columnName,
                        value: condition.value,
                    },
                }),
            ),
        };
    }

    update(id: number, updateRuleDto: UpdateRulesDto) {
        return `This action updates a #${id} rule`;
    }

    remove(id: number) {
        return `This action removes a #${id} rule`;
    }

    async findAll({
        condition,
    }: {
        condition: OrderedPaginationDto;
    }): Promise<RuleResponseDto> {
        // return await this.queryService.findEntityQuery({
        //     entity: Rule,
        //     filters: condition,
        //     dtoClass: GetRulesDto,
        // });

        return null;
    }
}
