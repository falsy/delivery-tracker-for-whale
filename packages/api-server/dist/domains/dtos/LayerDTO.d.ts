import ILayerDTO from "@domains/dtos/interfaces/ILayerDTO";
export default class LayerDTO<T> implements ILayerDTO<T> {
    readonly isError: boolean;
    readonly message: string;
    readonly data?: T;
    readonly errorCode?: string;
    readonly errorDetails?: unknown;
    constructor({ isError, message, data, errorCode, errorDetails }?: {
        isError?: boolean;
        message?: string;
        data?: T;
        errorCode?: string;
        errorDetails?: unknown;
    });
}
//# sourceMappingURL=LayerDTO.d.ts.map