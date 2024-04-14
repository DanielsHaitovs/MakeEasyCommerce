import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class IdsFilterPipe implements PipeTransform {
    transform(ids: number[]): number[] {
        if (ids.length === 0) {
            return null;
        }

        if (!Array.isArray(ids)) {
            ids = [ids];
        }

        ids = ids.map((id) => parseInt(id.toString(), 10));

        return ids;
    }
}
