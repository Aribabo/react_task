export default class TweetService {
  constructor(http, tokenStorage, socket) {
    this.http = http;
    this.tokenStorage = tokenStorage;
    this.socket = socket;
  }

  async getTweets(username) {
    // getTweets함수 하나로 특정유저의 글과 모든 유저의 글 가져오게끔 설정
    const query = username ? `?username=${username}` : '';
    return this.http.fetch(`/tweets${query}`, {
      method: 'GET',
      // 헤더에 내 토큰정보 실어서 보냄
      headers: this.getHeaders(),
    });
  }

  async postTweet(text) {
    // 글작성 
    return this.http.fetch(`/tweets`, {
      method: 'POST',
      headers: this.getHeaders(),
      //json형식으로 전달  text만 전달하면 Server에서 token분석으로 통해 나온 유저 id를 사용하여 글을 업데이트해줌
      body: JSON.stringify({ text }),
    });
  }
// 해당 트윗 삭세
  async deleteTweet(tweetId) {
    return this.http.fetch(`/tweets/${tweetId}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });
  }
// 트윗 업데이트
  async updateTweet(tweetId, text) {
    return this.http.fetch(`/tweets/${tweetId}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify({ text }),
    });
  }

  getHeaders() {
    const token = this.tokenStorage.getToken();
    return {
      Authorization: `Bearer ${token}`,
    };
  }
// 이벤트 리스너 생성 
  onSync(callback) {
    // 이때 리턴값은 () => this.io.off(event)인 함수
    // 그 함수를 그대로 리턴해줌
    return this.socket.onSync('tweets', callback);
  }
}
