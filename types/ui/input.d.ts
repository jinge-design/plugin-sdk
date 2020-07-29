export declare enum UIInputType {
    'string' = 0,
    'selection' = 1
}
export interface UIInputOptions {
    description?: string;
    type?: UIInputType;
    initialValue?: string;
    possibleValues?: string[];
    numberOfLines?: number;
}
export declare function getInputFromUser(options: UIInputOptions): Promise<[Error, string]>;
