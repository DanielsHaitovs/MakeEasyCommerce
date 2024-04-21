import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { HandlerService } from '@src/mec/service/handler/query.service';
import { CreateRuleDto } from '../dto/create-rule.dto';
import { RuleResponseDto } from '../dto/get-rule.dto';
import { AttributeRule } from '../entities/rule.entity';
import { PaginationDto } from '@src/mec/dto/query/filter.dto';
import { RuleQueryDto } from '../dto/filter.dto';
import { RuleHelperService } from './query/helper.service';
import { BackRuleSelect, FrontRuleSelect, RuleShortSelect } from '../enum/rule.enum';
import { UpdateRuleDto } from '../dto/update-rule.dto';

@Injectable()
export class RuleService {
    private logPath = 'rule/error.log';

    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
        private readonly handlerService: HandlerService,
        private readonly ruleHelper: RuleHelperService
    ) {}

    /**
     * This method is used to create a new rule.
     * It takes an object with a `rule` property of type `CreateRuleDto`.
     * It returns a Promise that resolves to an object of type `RuleResponseDto`.
     *
     * @param {Object} param0 - An object containing the rule to be created.
     * @param {CreateRuleDto} param0.rule - The rule to be created.
     * @returns {Promise<RuleResponseDto>} A Promise that resolves to an object containing the status, message, and result of the operation.
     * @throws {Error} If there's an error during the operation, it will be caught and handled by the `handlerService`.
     */
    async createRule({ rule }: { rule: CreateRuleDto }): Promise<RuleResponseDto> {
        try {
            const newRule = this.ruleHelper.prepareRule({ createRule: rule });

            if (newRule != null && (newRule.front != undefined || newRule.back != undefined)) {
                // If successful, return a response with status 200 and a success message.
                return {
                    status: '200',
                    result: [await this.entityManager.save(AttributeRule, newRule)]
                };
            }

            return null;
        } catch (error) {
            // If there's an error, cast it to an Error object and handle it using the handler service.
            // The handler service will return a response with status 666 and an error message.
            const e = error as Error;
            return this.handlerService.handleError({
                e,
                message: 'Could not save Rule',
                where: this.createRule.name,
                name: RuleService.name,
                logPath: this.logPath
            });
        }
    }

    /**
     * This method is used to get a rule by its ID.
     * It takes an object with an `id` property.
     * It returns a Promise that resolves to an object of type `RuleResponseDto`.
     *
     * @param {Object} param0 - An object containing the ID of the rule to be fetched.
     * @param {number} param0.id - The ID of the rule.
     * @returns {Promise<RuleResponseDto>} A Promise that resolves to an object containing the status, message, and result of the operation.
     * @throws {Error} If there's an error during the operation, it will be caught and handled by the `handlerService`.
     */
    async getRuleById({ id }: { id: number }): Promise<RuleResponseDto> {
        try {
            const result = await this.entityManager.findOneByOrFail(AttributeRule, { id });

            if (result != undefined && result.id === id) {
                // Attempt to fetch the rule by its ID using the entity manager.
                // If successful, return a response with status 200 and a success message.
                return {
                    status: '200',
                    result: [result]
                };
            }

            return null;
        } catch (error) {
            // If there's an error, cast it to an Error object and handle it using the handler service.
            // The handler service will return a response with status 666 and an error message.
            const e = error as Error;

            return this.handlerService.handleError({
                e,
                message: 'Could not find Rule by given ID',
                where: this.getRuleById.name,
                name: RuleService.name
            });
        }
    }

    /**
     * This method is used to get a rule by its ID and type.
     * It takes an object with `id` and `type` properties.
     * It returns a Promise that resolves to an object of type `RuleResponseDto`.
     *
     * @param {Object} param0 - An object containing the ID and type of the rule to be fetched.
     * @param {number} param0.id - The ID of the rule.
     * @param {string} param0.type - The type of the rule.
     * @returns {Promise<RuleResponseDto>} A Promise that resolves to an object containing the status, message, and result of the operation.
     * @throws {Error} If there's an error during the operation, it will be caught and handled by the `handlerService`.
     */
    async getRuleType({ id, type }: { id: number; type: RuleShortSelect }): Promise<RuleResponseDto> {
        try {
            if (type != RuleShortSelect.All) {
                const ruleQuery = this.entityManager.createQueryBuilder(AttributeRule, 'rule').where('rule.id = :id', { id });

                if (type == RuleShortSelect.Front) {
                    const frontRule = Object.values(FrontRuleSelect);
                    return {
                        status: '200',
                        result: [await ruleQuery.select(frontRule).getOneOrFail()]
                    };
                }

                if (type == RuleShortSelect.Back) {
                    const backRule = Object.values(BackRuleSelect);

                    return {
                        status: '200',
                        result: [await ruleQuery.select(backRule).getOneOrFail()]
                    };
                }

                // Attempt to fetch the rule by its ID and type using the entity manager.
                // If successful, return a response with status 200 and a success message.
                return {
                    status: '200',
                    result: [await ruleQuery.select(`rule.${type}`).getOneOrFail()]
                };
            }

            return await this.getRuleById({ id });
        } catch (error) {
            // If there's an error, cast it to an Error object and handle it using the handler service.
            // The handler service will return a response with status 666 and an error message.
            const e = error as Error;
            return this.handlerService.handleError({
                e,
                message: 'Could not find Rule by given Type',
                where: this.getRuleType.name,
                name: RuleService.name
            });
        }
    }

    /**
     * This method is used to get a paginated list of rules.
     * It takes a `PaginationDto` object and returns a Promise that resolves to an object of type `RuleResponseDto`.
     *
     * @param {PaginationDto} pagination - An object containing the pagination parameters.
     * @returns {Promise<RuleResponseDto>} A Promise that resolves to an object containing the status, message, and result of the operation.
     * @throws {Error} If there's an error during the operation, it will be caught and handled by the `handlerService`.
     */
    async getRules({ pagination }: { pagination: PaginationDto }): Promise<RuleResponseDto> {
        try {
            // If the limit or page is not defined in the pagination object, set them to 0.
            if (pagination.limit == undefined || pagination.page == undefined) {
                pagination.limit = 0;
                pagination.page = 0;
            }

            // Fetch the rules using the entity manager, skipping and taking according to the pagination parameters.
            const result = await this.entityManager
                .createQueryBuilder(AttributeRule, 'rule')
                .skip((Number(pagination.page) - 1) * Number(pagination.limit))
                .take(Number(pagination.limit))
                .getMany();

            if (result != undefined && Object.keys(result[0]).length > 0) {
                // If the operation is successful, return a response with status 200 and a success message.
                return {
                    status: '200',
                    result
                };
            }

            // If the attribute is undefined or empty, return null
            return null;
        } catch (error) {
            // If there's an error, cast it to an Error object and handle it using the handler service.
            const e = error as Error;
            return this.handlerService.handleError({
                e,
                message: 'Could not find any Rules',
                where: this.getRules.name,
                name: RuleService.name
            });
        }
    }

    /**
     * This method is used to query rules based on provided filters.
     *
     * @param {Object} filters - An object of type RuleQueryDto containing the filters to apply to the query.
     *
     * @returns {Promise<RuleResponseDto>} - Returns a promise that resolves to an object of type RuleResponseDto.
     * If the query is successful, the promise resolves to the queried rules.
     * If the query fails, the promise resolves to an error object with details about the error.
     *
     * @throws {Error} - Throws an error if the query fails.
     */
    async ruleQuery({ filters }: { filters: RuleQueryDto }): Promise<RuleResponseDto> {
        try {
            // Attempt to query rules using the provided filters
            return await this.ruleHelper.filterQuery({ filters });
        } catch (error) {
            // If the query fails, cast the error to an Error object
            const e = error as Error;
            // Handle the error using the handler service
            return this.handlerService.handleError({
                e,
                message: 'Could not find any Rules',
                where: this.ruleQuery.name,
                name: RuleService.name,
                logPath: this.logPath
            });
        }
    }

    /**
     * Updates a rule with the given id and rule data.
     *
     * @param {Object} params - The parameters for updating a rule.
     * @param {number} params.id - The id of the rule to update.
     * @param {UpdateRuleDto} params.rule - The data to update the rule with.
     *
     * @returns {Promise<RuleResponseDto>} A Promise that resolves to an object containing the status, message, and result of the operation.
     * @throws {Error} If there's an error during the operation, it will be caught and handled by the `handlerService`.
     */
    async updateRule({ id, rule }: { id: number; rule: UpdateRuleDto }): Promise<RuleResponseDto> {
        return await this.ruleHelper.update({ id, rule });
    }

    /**
     * Deletes a rule with the given id.
     *
     * @param {Object} params - The parameters for deleting a rule.
     * @param {number} params.id - The id of the rule to delete.
     *
     * @returns {Promise<RuleResponseDto>} A Promise that resolves to an object containing the status, message, and result of the operation.
     * @throws {Error} If there's an error during the operation, it will be caught and handled by the `handlerService`.
     */
    async deleteRule({ id }: { id: number }): Promise<RuleResponseDto> {
        return await this.ruleHelper.remove({ id });
    }
}
