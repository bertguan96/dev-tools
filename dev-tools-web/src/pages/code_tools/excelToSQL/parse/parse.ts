import {IParse} from "@/pages/code_tools/excelToSQL/parse/parse.interface";
import {ExcelDataParse, ParseData} from "@/pages/code_tools/excelToSQL/parse/parse.data";

export class DataParse implements IParse {

    public parse(data: string): ParseData {
        switch (data) {
            case 'Excel':
                return new ExcelParse().parse();
        }
        return {};
    }
}

class ExcelParse {
    public parse(): ExcelDataParse {
        const sourceInput = document.getElementById('sourceInput')
        if (sourceInput && sourceInput.textContent === '') {
            return {header: [], value: []};
        }
        if (sourceInput && sourceInput.childNodes) {
            const nodes = sourceInput.childNodes;
            const excelData: ExcelDataParse = {
                header: [],
                value: []
            };
            const textNode: ChildNode[] = []
            nodes.forEach((node: ChildNode) => {
                if (node.nodeType === 3) {
                    textNode.push(node)
                }
            });
            // 设置头部
            const headerText = textNode[0].textContent
            if (headerText) {
                const headerData = headerText.split('|')
                for (let i = 0; i < headerData.length; i++) {
                    const data = headerData[i];
                    if (data != "") {
                        excelData.header.push(data.trim())
                    }
                }
            }
            // 设置value
            for (let i = 2; i < textNode.length; i++) {
                const nodeText = textNode[i].textContent;
                if (nodeText) {
                    const nodeData = nodeText.split('|')
                    const rowData: string[] = []  //
                    for (let j = 0; j < nodeData.length; j++) {
                        const data = nodeData[j];
                        if (data != "") {
                            rowData.push(data);
                        }
                    }
                    excelData.value.push(rowData)
                }
            }

            return excelData;
        }
        return {header: [], value: []};
    }
}