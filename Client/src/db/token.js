const TOKEN = 'token';

export default class TokenStorage {
  saveToken(token) { // 토큰 저장
    localStorage.setItem(TOKEN, token); 
  }

  getToken() { // 저장된 토큰 반환
    return localStorage.getItem(TOKEN);
  }

  clearToken() { // 토큰 삭제
    localStorage.clear(TOKEN);
  }
}
