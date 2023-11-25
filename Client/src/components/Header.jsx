import React, { memo } from 'react';

const Header = memo(({ username, onLogout, onMyTweets, onAllTweets }) => {
  return (
    <header className='header'>
      <div className='logo'>
        <img src='./img/logo.png' alt='Dwitter Logo' className='logo-img' />
        <h1 className='logo-name'>Dwitter</h1>
        {/* 사용자 이름이 있으면 표시 */}
        {username && <span className='logo-user'>@{username}</span>}
      </div>
      {username && (
        <nav className='menu'>{/* 메뉴 영역 */}
          <button onClick={onAllTweets}>All Tweets</button> {/* 모든 트윗 보기 버튼 */}
          <button onClick={onMyTweets}>My Tweets</button> {/* 내 트윗 보기 버튼 */}
          <button className='menu-item' onClick={onLogout}>
            Logout
          </button>
        </nav>
      )}
    </header>
  );
});

export default Header;
