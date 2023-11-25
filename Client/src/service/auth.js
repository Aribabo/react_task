export default class AuthService {
  constructor(http, tokenStorage) {
    this.http = http;
    this.tokenStorage = tokenStorage;
  }
  // 회원가입 메서드
  async signup(username, password, name, email, url) {
    const data = await this.http.fetch('/auth/signup', {
      method: 'POST',
      //JavaScript 객체나 값들을 JSON 문자열로 변환하는 메서드
      body: JSON.stringify({
        username,
        password,
        name,
        email,
        url,
      }),
    });
    // data에 fetch결과가 반환되어 저장됨
    // 이때 발생한 토큰을 저장
    this.tokenStorage.saveToken(data.token);
    return data;
  }

  // 로그인 메서드
  async login(username, password) {
    const data = await this.http.fetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
    this.tokenStorage.saveToken(data.token);
    return data;
  }

  async me() {
    const token = this.tokenStorage.getToken();
    return this.http.fetch('/auth/me', {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async logout() {
    this.tokenStorage.clearToken();
  }
}
