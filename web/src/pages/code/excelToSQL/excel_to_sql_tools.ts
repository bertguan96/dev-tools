import {ExcelDataParse} from "@/pages/code/excelToSQL/parse/parse.data";


function capitalizeFirstLetter(str: string) {
    return str.slice(0, 1).toUpperCase() + str.slice(1);
}

function toHungarian(str: string) {
    return str
        .replace(/([a-z])([A-Z])/g, "$1_$2") // 将大写字母前加下划线
        .toLowerCase();
}

function toCamelCase(str: string) {
    return str
        .replace(/_(\w)/g, function (match, letter) {
            return letter.toUpperCase();
        })
        .replace(/_/g, '');
}

export class ExcelToSqlTools {

    private static excelToSql: ExcelToSqlTools;

    private constructor() {
    }

    public static getInstance(): ExcelToSqlTools {
        if (!this.excelToSql) {
            this.excelToSql = new ExcelToSqlTools()
        }
        return this.excelToSql
    }

    public firstKeyUpper(header: string[]) {
        for (let i = 0; i < header.length; i++) {
            header[i] = capitalizeFirstLetter(header[i])
        }
    }

    public camel2Hungarian(header: string[]) {
        for (let i = 0; i < header.length; i++) {
            header[i] = toHungarian(header[i])
        }
    }

    public hungarian2Camel(header: string[]) {
        for (let i = 0; i < header.length; i++) {
            header[i] = toCamelCase(header[i])
        }
    }

    public generateCreateSql(data: ExcelDataParse, tableName: string): string {
        const columns = data.header.map(col => `"${col}"`).join(',');
        return `create table ${tableName} (${columns});`;
    }

    public generateInsertSql(data: ExcelDataParse, tableName: string): string {
        const columns = data.header.join(',');
        const valueRows = data.value.map(row => row.map(value => `'${value.trim()}'`));
        const values = valueRows.map(row => `(${row})`).join(', ');
        return `INSERT INTO ${tableName} (${columns}) values ${values};`;
    }

}