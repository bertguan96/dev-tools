

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

export class Websocket_factory {

    private  static WebsocketConn: Websocket_factory;

    private websocket: WebSocket | undefined;

    private lockNumber: number = 0;

    private WebsocketTools(){}

    public static getInstance(): Websocket_factory {
        if (!this.WebsocketConn) {
            this.WebsocketConn = new Websocket_factory()
        }
        return this.WebsocketConn
    }

    public newConnect(url: string) {
        try {
            this.websocket = new WebSocket(url);
        } catch (e: any) {
            console.error(e)
        }
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

    public checkConnect(lock: () => void) {
        const setIntervalHandler = setInterval(() => {
            if (this.lockNumber > 3) {
                clearInterval(setIntervalHandler)
                return
            }
            if (this.websocket && this.websocket.readyState == 1 ) {
                console.log("链接成功")
                clearInterval(setIntervalHandler)
                lock()
            }
            this.lockNumber++;
        }, 100)
    }

    public onMessage(message: string) {
        if (this.websocket) {
            // 发送消息
            this.websocket.send(message)
        }
    }

    public isConnected(): boolean {
        if (this.websocket) {
            return this.websocket.readyState == 1
        }
        return false
    }
}