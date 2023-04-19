import {MessagePlugin} from "tdesign-vue-next";

export class ClipboardTools {
    public static writeToClipboard  (text: string)  {
        try {
            navigator.clipboard.writeText(text);
            MessagePlugin.info('复制成功')
        } catch (err) {
            MessagePlugin.error('Failed to copy: ' + err)
        }
    }
}