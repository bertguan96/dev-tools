import {ParseData} from "@/pages/code_tools/excelToSQL/parse/parse.data";

export interface IParse {
    parse(data: string): ParseData;
}

