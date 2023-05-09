import {FormData, GEN_TYPE, GoFields, GoStruct} from "@/pages/code_tools/gorm_code_generator/data";

export function toSnakeCase(str: string) {
    return str.replace(/[A-Z]/g, match => `_${match.toLowerCase()}`).
    replace(/^_/, '').toLowerCase();
}

export function parseGoStruct(str: string): GoStruct {
    // 匹配结构体名称和字段
    const regex = /type\s+(\w+)\s+struct\s+\{([\s\S]*?)\}/g;
    let matches;
    const result: GoStruct = {};
    // 遍历匹配结果
    while ((matches = regex.exec(str)) !== null) {
        const structName = matches[1];
        const structFields = matches[2].trim().split(/\r?\n/);

        // 解析结构体字段
        const fields: GoFields = {};
        for (let fieldStr of structFields) {
            fieldStr = fieldStr.trim();
            if (fieldStr === "") continue;
            const [fieldName, fieldType] = fieldStr.split(/\s+/);
            fields[fieldName] = fieldType;
        }
        // 添加到结果中
        result[structName] = fields;
    }

    return result;
}

/**
 * 代码生成处理器
 */
export class CodeHandler {

    private static codeHandler: CodeHandler;

    private CodeHandler() {
    }

    public static getInstance() {
        if (!this.codeHandler) {
            this.codeHandler = new CodeHandler();
        }
        return this.codeHandler;
    }

    /**
     * 执行生成
     * @param data
     */
    public static doHandler(data: FormData): string[] {
        const handler = this.getInstance();
        if (data.generatorType === GEN_TYPE.CREATE) {
            return handler.gen_create_function(data);
        }
        return [];
    }

    private gen_create_function(data: FormData): string[] {
        const structData = parseGoStruct(data.struct);
        const sqls: string[] = []
        for (let key of Object.keys(structData)) {
            sqls.push(`if err := db.Create(&${key}).Err; err != nil {\n\treturn err\n}`)
        }
        return sqls
    }
}