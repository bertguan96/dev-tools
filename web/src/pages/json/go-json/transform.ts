import { GoChangeData } from "./data";



const firstLetterToLowerCase = (str: string) => {
  if (str.length === 0) return str; // 如果字符串为空，则返回原字符串
  return str.charAt(0).toLowerCase() + str.substring(1);
}
/**
 * 转换器
 */
export class Transform {
    /**
     * Go结构体，转换为JSON输出
     * @param input 
     */
    public static GoToJson(input: string) {
        input = input.replaceAll('\n', ' '); // 去除多余空格
        input = input.replaceAll('\t', ' '); // 去除多余空格
        const params = input.split(' ');
        // 剔除空字符串
        for (let i = 0; i < params.length; i++) {
            if (params[i] == '') {
                params.splice(i, 1);
                i--;
            }
        }
        // 开始转化
        const len = params.length;
        let isInStruct = false;
        let object: GoChangeData = {}
        for (let i = 0; i < len; i++) {
            if (isInStruct) {
                // 当前参数的下一个参数是类型参数，则为字段
                if (['string', 'int64', 'int', 'float64', 'bool'].indexOf(params[i + 1]) > -1) {
                    object[firstLetterToLowerCase(params[i])] = `${params[i + 1]}`
                }
            }
            if (params[i] == '{') {
                isInStruct = true;
                continue
            } else if (params[i] == '}') {
                isInStruct = false;
                continue
            }
        }
        return JSON.stringify(object, null, 4)
    }
}