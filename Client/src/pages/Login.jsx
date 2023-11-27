import React, { useState } from 'react';
import Banner from '../components/Banner';

// Login 컴포넌트는 사용자 로그인 및 회원가입을 처리하는 폼을 제공
const Login = ({ onSignUp, onLogin }) => {
  const [signup, setSignup] = useState(false); // 회원가입 여부를 나타내는 상태값
  const [username, setUsername] = useState(''); // 사용자 아이디 입력값
  const [password, setPassword] = useState(''); // 비밀번호 입력값
  const [name, setName] = useState(''); // 회원가입 시 사용자 이름 입력값
  const [email, setEmail] = useState(''); // 회원가입 시 이메일 입력값
  const [url, setURL] = useState(''); // 회원가입 시 프로필 이미지 URL 입력값
  const [text, setText] = useState(''); // 폼 하단에 노출될 메시지
  const [isAlert, setIsAlert] = useState(false); // 알림 여부

  // 폼 제출 시 실행되는 함수
  const onSubmit = (event) => {
    event.preventDefault();
    // signup 상태에 따라 회원가입 또는 로그인 함수를 호출
    if (signup) {
      onSignUp(username, password, name, email, url).catch(setError);
    } else {
      onLogin(username, password).catch(setError);
    }
  };

  // 오류 발생 시 실행되는 함수
  const setError = (error) => {
    setText(error.toString()); // 오류 메시지를 문자열로 변환하여 text 상태에 저장
    setIsAlert(true); // 알림 상태를 활성화하여 화면에 메시지를 노출
  };

  // 입력 필드의 값이 변경될 때 실행되는 함수
  const onChange = (event) => {
    const {
      target: { name, value, checked },
    } = event;
    // 입력 필드의 name 속성을 기반으로 해당되는 상태값을 업데이트
    switch (name) {
      case 'username':
        return setUsername(value);
      case 'password':
        return setPassword(value);
      case 'name':
        return setName(value);
      case 'email':
        return setEmail(value);
      case 'url':
        return setURL(value);
      case 'signup':
        return setSignup(checked);
      default:
    }
  };

  return (
    <>
      {/* 화면 상단에 오류 메시지를 노출하는 Banner  */}
      <Banner text={text} isAlert={isAlert} />
      {/* 사용자 로그인 또는 회원가입을 처리하는 폼 */}
      <form className='auth-form' onSubmit={onSubmit}>
        {/* 사용자 아이디 입력 필드 */}
        <input
          name='username'
          type='text'
          placeholder='Id'
          value={username}
          onChange={onChange}
          className='form-input'
          required
        />
        {/* 비밀번호 입력 필드 */}
        <input
          name='password'
          type='password'
          placeholder='Password'
          value={password}
          className='form-input'
          onChange={onChange}
        />
        {/* 회원가입 시에만 나타나는 입력 필드들 */}
        {signup && (
          <>
            {/* 사용자 이름 입력 필드 */}
            <input
              name='name'
              type='text'
              placeholder='Name'
              value={name}
              onChange={onChange}
              className='form-input'
              required
            />
            {/* 이메일 입력 필드 */}
            <input
              name='email'
              type='email'
              placeholder='Email'
              value={email}
              onChange={onChange}
              className='form-input'
              required
            />
            {/* 프로필 이미지 URL 입력 필드 */}
            <input
              name='url'
              type='url'
              placeholder='Profile Image URL'
              value={url}
              onChange={onChange}
              className='form-input'
            />
          </>
        )}
        {/* 회원가입 여부를 선택하는 체크박스 */}
        <div className='form-signup'>
          <input
            name='signup'
            id='signup'
            type='checkbox'
            onChange={onChange}
            checked={signup}
          />
          <label htmlFor='signup'> Create a new account?</label>
        </div>
        {/* 폼 제출 버튼 */}
        <button className='form-btn auth-form-btn' type='submit'>
          {signup ? 'Sign Up' : 'Sign In'}
        </button>
      </form>
    </>
  );
};

export default Login; 
