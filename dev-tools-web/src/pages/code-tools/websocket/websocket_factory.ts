

// function initWebSocket(wsUri) {
//     websocket.onopen = function(evt) {
//         console.log('连接建立中... '+wsUri);
//     };
//     websocket.onclose = function(evt) {
//         console.log('连接关闭中...', evt);
//     };
//     websocket.onmessage = function(evt) {
//         console.log('收到来自服务端的消息：', evt.data);
//     };
//     websocket.onerror = function(evt) {
//         console.log('发生错误...', evt);
//     };
//     return websocket;
// }

export class WebsocketFactory {

    private  static WebsocketConn: WebsocketFactory;

    private websocket: WebSocket | undefined;

    private isConnect: boolean = false;

    private WebsocketTools(){}

    public static getInstance(): WebsocketFactory {
        if (!this.WebsocketConn) {
            this.WebsocketConn = new WebsocketFactory()
        }
        return this.WebsocketConn
    }

    public newConnect(url: string) {
        this.websocket = new WebSocket(url);
    }

    public addListener(readMessage: (msg: string) => void) {
        if (this.websocket) {
            this.websocket.onmessage = (event: MessageEvent) =>  {
                readMessage(event.data)
            };
            this.websocket.onclose = (event: CloseEvent) =>  {
                readMessage(event.reason)
            };
            this.websocket.onopen = (event: Event) => {
                console.log(event)
            }
            this.websocket.onerror = (event: Event) => {
                console.error(event)
            }
        }
    }

    public checkConnect(readMessage: (msg: string, type: string) => void) {
        const setIntervalHandler = setInterval(() => {
            if (this.websocket && this.websocket.readyState == 1 ) {
                console.log("链接成功")
                clearInterval(setIntervalHandler)
            }
        }, 100)
    }

    public onMessage(message: string) {
        if (this.websocket) {
            // 发送消息
            this.websocket.send(message)
        } else {

        }
    }

    public isConnected(): boolean {
        if (this.websocket) {
            return this.websocket.readyState == 1
        }
        return false
    }
}