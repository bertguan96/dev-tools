import {defineComponent, onMounted, PropType, ref} from 'vue';
import './table-editor.css'

export interface EditorButtonConfig {
    key: string;
    name: string;
    onClick: (key: string) => void;
    colWidth: number;
    width: number;
    height: number;
}

export interface EditorOptions {
    buttonConfig: EditorButtonConfig[];
}

interface Props {
    options: EditorOptions;
}


/**
 * 表格解析组件，可以根据传入参数动态渲染表格大小
 */
export const TableEditor = defineComponent({
    name: 'TableEditor',
    props: {
        options: {
            type: Object as PropType<Props['options']>,
            default: null
        }
    },
    setup(props) {
        return () => (
            <>
                <t-row class="table-editor-row">
                    {
                        props.options && props.options.buttonConfig.map((config) => (
                            <t-col
                                span={config.colWidth}>
                                <t-button theme="default" variant="outline"
                                          class="table-editor-button"
                                          onClick={config.onClick.bind(this, config.key)}>{config.name}</t-button>
                            </t-col>
                        ))
                    }
                </t-row>
            </>
        )
    }
})

