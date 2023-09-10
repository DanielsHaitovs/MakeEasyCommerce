import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { RuleService } from '../services/rule.service';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateRulesDto } from '../dto/post-rule.dto';
import { UpdateRulesDto } from '../dto/update-rule.dto';

@Controller('rule')
@ApiTags('Rule')
export class RuleController {
    constructor(private readonly ruleService: RuleService) {}

    @Post('new')
    @ApiOperation({
        summary: 'Create Attribute Rules',
        description: 'Creates record (specifically) for rule attribute entity',
    })
    @ApiBody({
        type: CreateRulesDto,
        description: 'Create Attribute Rules',
        required: true,
    })
    async create(@Body() createRulesDto: CreateRulesDto) {
        return this.ruleService.create({ createRulesDto });
    }

    @Get()
    findAll() {
        return this.ruleService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.ruleService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateRulesDto: UpdateRulesDto) {
        return this.ruleService.update(+id, updateRulesDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.ruleService.remove(+id);
    }
}
