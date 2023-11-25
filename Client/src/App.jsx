import { Switch, Route, useHistory } from 'react-router-dom';
import Header from './components/Header';
import AllTweets from './pages/AllTweets';
import MyTweets from './pages/MyTweets';
import { useAuth } from './context/AuthContext';

// mvc 패턴처럼 화면과 로직을 분리
// jsx는 화면을 그리는 쪽
// html안에 자바를 쓰고싶을때는 {}를 사용

function App({ tweetService }) {
  // 현재 브라우저의 주소 
  const history = useHistory();
  const { user, logout } = useAuth();
  
  const onAllTweets = () => {
    // 히스토리를 통해 다른 경로로 이동
    history.push('/');
  };

  const onMyTweets = () => {
    // 히스토리를 통해 다른 경로로 이동
    history.push(`/${user.username}`);
  };

  const onLogout = () => {
    // 로그아웃 확인 팝업창 띄우기
    // 사용자가 확인 누르면 true 아니면 false 리턴
    if (window.confirm('Do you want to log out?')) {
      logout();
      // 히스토리를 통해 다른 경로로 이동
      history.push('/');
    }
  };

  return (
    <div className='app'>
      <Header
      // 헤더라는 jsx파일의 함수에 사용자 데이터와 버튼누를때 사용할 함수 전달
        username={user.username}
        onLogout={onLogout}
        onAllTweets={onAllTweets}
        onMyTweets={onMyTweets}
      />
      <Switch> 
        (
        <>
        {/* 해당 경로로 url이 바뀌면 아래의 html실행 */}
          <Route exact path='/'>
            <AllTweets tweetService={tweetService} />
          </Route>
          <Route exact path='/:username'>
            <MyTweets tweetService={tweetService} />
          </Route>
        </>
        )
      </Switch>
    </div>
  );
}

export default App;
