import {defineComponent, onMounted, PropType, ref} from 'vue';
import {ExcelDataParse} from '@/pages/code_tools/excelToSQL/parse/parse.data';
import './table.css'

interface Props {
    tableData: ExcelDataParse;
}


/**
 * 表格解析组件，可以根据传入参数动态渲染表格大小
 */
export const ParseTable = defineComponent({
    name: 'ParseTable',
    props: {
        tableData: {
            type: Object as PropType<Props['tableData']>,
            default: null
        }
    },
    setup(props) {

        onMounted(() => {
            const tableEditor = document.getElementById('table-editor');
            const table = document.getElementById('table');
            if (tableEditor && table) {
                table.style.height = `${tableEditor.clientHeight}px`;
            }
        });

        const getTableHeader = (): [] => {
            const header = props.tableData.header;
            const tableColumns = [];
            for (let i = 0; i < header.length; i++) {
                tableColumns.push({
                    colKey: header[i],
                    title: header[i],
                })
            }
            // @ts-ignore
            return tableColumns;
        }

        const getTableData = (): [] => {
            const tableDataList = []; // 数据列表
            // 1.获取obj的key生成一个对象
            const dataList = props.tableData.value;
            const header = props.tableData.header;
            for (let j = 0; j < dataList.length; j++) {
                const data = dataList[j]; // 取单行数据
                let obj = {};
                for (let i = 0; i < header.length; i++) {
                    Object.defineProperty(obj, header[i], {
                        value: data[i],
                        writable: true,
                        configurable: true,
                    });
                }
                tableDataList.push(obj);

            }
            // @ts-ignore
            return tableDataList;
        };

        return (props: { tableData: any; }) => (
            <>
                {
                    props.tableData
                    && props.tableData.header.length > 0
                    && props.tableData.value.length ? <t-table
                        id='table'
                        bordered='bordered'
                        columns={getTableHeader()}
                        data={getTableData()}
                    >
                    </t-table> : <div id='table' class='table-card'>空数据</div>
                }

            </>
        )
    }
})

