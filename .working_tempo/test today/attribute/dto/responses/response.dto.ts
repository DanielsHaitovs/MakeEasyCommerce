export class AttributeResponse {
    message: string;
    errors: [
        {
            message: string;
        },
        {
            status: number;
        },
    ];
}

// message: string;
// errors: [
//     {
//         message: string;
//         parameters: [
//             {
//                 resources: string;
//                 fieldName: string;
//                 fieldValue: string;
//             },
//         ];
//     },
// ];
// code: number;
// parameters: [
//     {
//         resources: string;
//         fieldName: string;
//         fieldValue: string;
//     },
// ];
// trace: string;
