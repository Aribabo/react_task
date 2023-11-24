import {
  createContext,
  createRef,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState, // state사용할 수 있게해줌
} from 'react';
import Header from '../components/Header';
import Login from '../pages/Login';

// createContext를 사용해서 state를 전역적으로 사용
// AuthContext는 이제 Provider과Consumer가 있는데 provider안에서 cousumer나 useContext를 사용하여 provider가 제공한 값을 사용할 수 있음
const AuthContext = createContext({});

// createRef를 사용하여 참조 객체 생성
// createRef를 사용하면 DOM(html 등)에 직접적으로 접근 가능
const contextRef = createRef();

// AuthProvider는 user의 정보를 저장
// 
export function AuthProvider({ authService, authErrorEventBus, children }) {
  // user라는 state생성, setUser함수로 변경가능 초기값은 undefined
  const [user, setUser] = useState(undefined);

  // contextRef에 user가 있으면 token을, 없으면 undefined을 전달 
  useImperativeHandle(contextRef, () => (user ? user.token : undefined));

  // useEffect는 특정 이벤트 발생함수
  useEffect(() => {
    authErrorEventBus.listen((err) => {
      console.log(err);
      // 에러가 나면 user를 undefined로 변경
      setUser(undefined);
    });
    //authErrorEventBus가 화면에 처음 나타날때와
    // authErrorEventBus가 변경될때만 이 효과가 실행
  }, [authErrorEventBus]);

  // authService가 랜더링되어 화면에 나타나거나 authService가 변경될 때 사용
  useEffect(() => {
    // authService의 me 메서드를 사용하여 사용자의 정보를 가져옴 완료되면 setUser를 사용하여 user를 변경
    authService.me().then(setUser).catch(console.error);
  }, [authService]);

  // 사용자의 회원가입을 처리하는 함수
  // useCallback을 사용하여 authService가 변경될 때마다 다시 생성되지 않도록
  const signUp = useCallback(
    async (username, password, name, email, url) => // authService의 signup 메서드를 호출하여 사용자를 등록합니다.
    // 해당 메서드는 서버에 사용자 정보를 전송하고, 성공 시 등록된 사용자 정보를 반환합니다.
      authService
        .signup(username, password, name, email, url)
        // user상태 업데이트
        .then((user) => setUser(user)),
    // authService가 변경될 때마다 함수가 재생성되지 않도록 의존성 배열에 authService를 명시
    [authService]
  );

  // 로그인 함수 생성
  const logIn = useCallback(
    async (username, password) =>
    // 로그인 성공하면 user state 변경
      authService.login(username, password).then((user) => setUser(user)),
    // authService가 변경될 때마다 함수가 재생성되지 않도록 의존성 배열에 authService를 명시
    [authService]
  );
    // 로그아웃시 user state에 undefined 저장
  const logout = useCallback(
    async () => authService.logout().then(() => setUser(undefined)),
    [authService]
  );
    // context로 이전에 계산된 값을 저장(memo)해줌
    // 이 안의 값들이 바뀌면 그때만 새로운 계산해줌
  const context = useMemo(
    () => ({
      user,
      signUp,
      logIn,
      logout,
    }),
    [user, signUp, logIn, logout]
  );

  return (
    // 여기서 value를 context로 했으니까 
    <AuthContext.Provider value={context}>
      {user ? ( // 유저가 있을때 자식 컴포넌트(children)를 렌더링(화면에 표출) 
        children
      ) : ( // 없으면 로그인 페이지로 이동
        <div className='app'>
          <Header />
          <Login onSignUp={signUp} onLogin={logIn} />
        </div>
      )}
    </AuthContext.Provider>
  );
}

export class AuthErrorEventBus {
  // 콜백함수 등록
  listen(callback) {
    this.callback = callback;
  }
  notify(error) {
    // 에러가 발생했을 때 , 에러를 알리기
    // 이때 콜백함수가 같이 호출됨
    this.callback(error);
  }
}

// AuthContext는 컨텍스트 객체 자체를 내보내기 때문에{}를 리턴 근데 얘를 useContext(AuthContext)하면 AuthProvider에서 제공되는 값을 리턴
export default AuthContext;
// token값 리턴
export const fetchToken = () => contextRef.current;
// useContext를 쓰면 컨텍스트의 값을 가져오는데 여기서는 86행의 value={context}에서 context값이 출력됨
export const useAuth = () => useContext(AuthContext);
