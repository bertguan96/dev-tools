import {ParseData} from "@/pages/code/excelToSQL/parse/parse.data";

export interface IParse {
    parse(data: string): ParseData;
}

