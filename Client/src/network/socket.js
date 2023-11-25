import socket from 'socket.io-client';

export default class Socket {
  constructor(baseURL, getAccessToken) {
    this.io = socket(baseURL, {
      auth: (cb) => cb({ token: getAccessToken() }),
    });

    this.io.on('connect_error', (err) => {
      console.log('socket error', err.message);
    });
  }
  // 특정이벤트에 대한 콜백함수 등록
  // 데이터 동기화 이벤트
  onSync(event, callback) {
    // 만약 소켓연결이 안되어있다면 연결
    if (!this.io.connected) {
      this.io.connect();
    }
    // 해당 이벤트가 발생했다면 콜백함수 실행
    this.io.on(event, (message) => callback(message));
    // 리턴값으로 함수를 반환 이 함수를 사용하기전까지 이벤트리스너는 살아있음
    return () => this.io.off(event);
  }
}
