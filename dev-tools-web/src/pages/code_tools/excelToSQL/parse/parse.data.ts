
/**
 * Go解析结构体
 */
export interface GoStructDataParse {

}

/**
 * python解析结果
 */
export interface PythonDataParse {

}

export interface ExcelDataParse {
    header: string[];
    value: string[][];
}


export type ParseData = GoStructDataParse | PythonDataParse | string | Number | boolean | ExcelDataParse | undefined;