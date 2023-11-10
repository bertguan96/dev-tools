import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';


/**
 * 顶部导航栏组件
 * 会更具router的变化而进行渲染
 */
export const BertHeader = defineComponent({
  name: 'Header',
  setup() {
    const router = useRouter();

    const onBtnClick = (path: string) => {
      router.hasRoute(path) && router.push({
        name: path
      });
    };

    return () => (
      <>
        <t-head-menu expandType='popup'>
          <t-menu-item value='0'>
            <div onClick={onBtnClick.bind(this, 'home')}>首页</div>
          </t-menu-item>
          <t-submenu value="1" title="JSON">
            <t-menu-item value='1-1'>
              <div onClick={onBtnClick.bind(this, 'jsonGo')}>Go转JSON</div>
            </t-menu-item>
            <t-menu-item value='1-2'>
              <div onClick={onBtnClick.bind(this, 'jsonFormat')}>JSON格式化</div>
            </t-menu-item>
            <t-menu-item value='1-3'>
              <div onClick={onBtnClick.bind(this, 'json2go')}>JSON转go</div>
            </t-menu-item>
          </t-submenu>
          <t-submenu value="2" title="AI">
            <t-menu-item value='2-1'>
              <div onClick={onBtnClick.bind(this, 'tokens')}>token计算</div>
            </t-menu-item>
          </t-submenu>
          <t-submenu value="3" title="编程辅助">
            <t-menu-item value='3-1'>
              <div onClick={onBtnClick.bind(this, 'diffCode')}>代码差异对比</div>
            </t-menu-item>
            <t-menu-item value='3-2'>
              <div onClick={onBtnClick.bind(this, 'websocket')}>Websocket测试</div>
            </t-menu-item>
            <t-menu-item value='3-3'>
              <div onClick={onBtnClick.bind(this, 'copyPaste')}>剪切板解析</div>
            </t-menu-item>
            <t-menu-item value='3-4'>
              <div onClick={onBtnClick.bind(this, 'ExcelToSQL')}>表格转SQL</div>
            </t-menu-item>
            <t-menu-item value='3-5'>
              <div onClick={onBtnClick.bind(this, 'random')}>随机字符生成器</div>
            </t-menu-item>
          </t-submenu>
          <t-submenu value="4" title="加密解密">
            <t-menu-item value='4-1'>
              <div onClick={onBtnClick.bind(this, 'urlCode')}>URL加密解密</div>
            </t-menu-item>
            <t-menu-item value='4-2'>
              <div onClick={onBtnClick.bind(this, 'base64')}>base64</div>
            </t-menu-item>
            <t-menu-item value='4-3'>
              <div onClick={onBtnClick.bind(this, 'md5')}>md5</div>
            </t-menu-item>
          </t-submenu>
          <t-submenu value="5" title="安全工具">
            <t-menu-item value='5-1'>
              <div onClick={onBtnClick.bind(this, 'urlCode')}>URL加密解密</div>
            </t-menu-item>
            <t-menu-item value='5-2'>
              <div onClick={onBtnClick.bind(this, 'base64')}>base64</div>
            </t-menu-item>
            <t-menu-item value='5-3'>
              <div onClick={onBtnClick.bind(this, 'md5')}>base64</div>
            </t-menu-item>
          </t-submenu>
{/*          <t-menu-item value='5'>
            <div onClick={onBtnClick.bind(this, 'chat')}>
              <t-link href="https://chat.bertguan.top" target="_blank">
                Chat
              </t-link>
            </div>
          </t-menu-item>*/}
        </t-head-menu>
      </>
    )
  }
})



