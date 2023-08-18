import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { applyDecorators } from '@nestjs/common';
import { dataConversion } from '@src/util/data-conversion';

export function ToBoolean() {
    const toPlain = Transform(
        ({ value }) => {
            return value;
        },
        {
            toPlainOnly: true,
        },
    );
    const toClass = (target: any, key: string) => {
        return Transform(
            ({ obj }) => {
                return dataConversion.valueToBoolean(obj[key]);
            },
            {
                toClassOnly: true,
            },
        )(target, key);
    };
    return applyDecorators(function (target: any, key: string) {
        toPlain(target, key);
        toClass(target, key);
    });
}

export const User = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        return request.user;
    },
);
