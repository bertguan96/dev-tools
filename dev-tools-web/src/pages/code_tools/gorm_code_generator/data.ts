

// 代码生成结构体
export interface FormData {

    struct: string;

    generatorType: string;

    tableName: string;

    config: string[];
}

export const GEN_TYPE = {
    CREATE: 'CREATE'
};

export interface GoFields {
    [key: string]: string;
}

export interface GoStruct {
    [key: string]: GoFields;
}