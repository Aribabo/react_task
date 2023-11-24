import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AuthService from './service/auth';
import TweetService from './service/tweet';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AuthErrorEventBus } from './context/AuthContext';
import HttpClient from './network/http';
import TokenStorage from './db/token';
import Socket from './network/socket';

const baseURL = process.env.REACT_APP_BASE_URL; // 애플리케이션이 서버와 통신할 때 사용할 기본 URL
const tokenStorage = new TokenStorage(); //토큰 저장,호출,삭제 기능이 있는 클래스 호출

//httpClient는 서버와의 통신을 담당
// baseurl과 다른 url을 합친 주소로 options(get,post,header)를 보내서 받은 응답을 json형식으로 리턴해주는 class
const httpClient = new HttpClient(baseURL);

// 에러 발생시 콜백함수 실행해주는 함수
const authErrorEventBus = new AuthErrorEventBus();
//
const authService = new AuthService(httpClient, tokenStorage);
const socketClient = new Socket(baseURL, () => tokenStorage.getToken());
const tweetService = new TweetService(httpClient, tokenStorage, socketClient);

// <함수등>을 써서 태그로 감싸줌
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider // user의 로그인,
        authService={authService}
        authErrorEventBus={authErrorEventBus}
      >
        <App tweetService={tweetService} /* 실제화면 */ /> 
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
