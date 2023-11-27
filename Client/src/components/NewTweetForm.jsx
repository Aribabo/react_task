import React, { useState } from 'react';
// 트윗목록페이지에서 트윗작성을 위한 폼 상단에 나타날 예정
const NewTweetForm = ({ tweetService, onError }) => {
  const [tweet, setTweet] = useState('');

    // 폼 제출 이벤트 처리 함수
  const onSubmit = async (event) => {
    // 기본 이벤트 반응 해지 -> 새로고침방지
    event.preventDefault();
    tweetService
      .postTweet(tweet)
      .then((created) => {
        // 새로운 트윗생성 성공시 입력칸 ''으로 리셋
        setTweet('');
      })
      .catch(onError);
  };

  const onChange = (event) => {
    // 입력 필드의 내용이 변경될 때마다 tweet 상태 업데이트
    // event.target.value는 사용자가 입력한 내용을 나타냄
    // 즉 사용자가 input태그에 값을 입력하면 tweet값을 업데이트해줌
    // 이렇게 업데이트된 tweet값은 위의 onSubmit함수에서 사용
    setTweet(event.target.value);
  };
//JSX로 폼 구성
  return (
    <form className='tweet-form' onSubmit={onSubmit}>
      {/* 입력 필드 */}
      <input
        type='text'
        placeholder='Edit your tweet'
        value={tweet} //입력 필드의 현재 값은 tweet 상태와 동기화
        required // 무조건 입력받음
        autoFocus //페이지 로딩 시 해당 입력 필드에 자동으로 포커스
        onChange={onChange} // 입력 필드의 값이 변경될 때마다 실행되는 함수
        className='form-input tweet-input'
      />
      <button type='submit' className='form-btn'>
        Post
      </button>
    </form>
  );
};

export default NewTweetForm;
