export default class HttpClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async fetch(url, options) {
    // baseURL+url을 합쳐서 서버에 요청
    // options는 추가적인 요청 옵션들을 전달하는데, 주로 HTTP 요청의 메서드(GET, POST 등), 헤더 등이 여기에 포함
    const res = await fetch(`${this.baseURL}${url}`, {
      ...options,
      headers: {
        // json형식으로 데이터를 보냄
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    let data;
    try {
      // 서버의 응답형식을 json형식으로 반환
      data = await res.json();
    } catch (error) {
      console.error(error);
    }

    if (res.status > 299 || res.status < 200) {
      // 응답된 res의 값의 200번대가 아닐경우 오류 메세지 출력
      const message =
        data && data.message ? data.message : 'Something went wrong! 🤪';
      throw new Error(message);
    }
    // 응답받은 데이터를 리턴
    return data;
  }
}
