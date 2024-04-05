import { Injectable, PipeTransform } from '@nestjs/common';
import { AttributeRelationSelectDto } from '../dto/filter-attribute.dto';

@Injectable()
export class AttributeRelationSelectPipe implements PipeTransform {
    transform(value: AttributeRelationSelectDto): AttributeRelationSelectDto {
        if (value.joinOptions == undefined) {
            value.joinOptions = false;
        } else if (['true', 'yes', '1'].includes(value.joinOptions.toString().toLowerCase())) {
            value.joinOptions = true;
        } else {
            value.joinOptions = false;
        }

        if (value.joinRule == undefined) {
            value.joinRule = false;
        } else if (['true', 'on', 'yes', '1'].includes(value.joinRule.toString().toLowerCase())) {
            value.joinRule = true;
        } else {
            value.joinRule = false;
        }

        return value;
    }
}
