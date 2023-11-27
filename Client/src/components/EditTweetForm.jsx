import React, { useState } from 'react';
//트윗을 수정하는 폼
const EditTweetForm = ({ tweet, onUpdate, onClose }) => {
  // text state를 초기화하고 해당 트윗의 텍스트로 설정
  const [text, setText] = useState(tweet.text);
  // 폼이 제출되면 호출되는 함수
  const onSubmit = async (event) => {
    event.preventDefault(); // 기본 제출 동작을 막음. 새로고침 안되게함
    onUpdate(tweet.id, text);// onUpdate 함수를 호출하여 트윗을 업데이트
    onClose();// 폼을 닫음
  };
// 입력 필드의 값이 변경될 때 호출되는 함수
  const onChange = (event) => {
    //input 태그의 값을 text값으로 변경
    setText(event.target.value);
  };
// 폼을 렌더링
  return (
    <form className='edit-tweet-form' onSubmit={onSubmit}>
      <input
        type='text'
        placeholder='Edit your tweet'
        value={text}
        required
        autoFocus
        onChange={onChange}
        className='form-input tweet-input'
      />
      <div className='edit-tweet-form-action'>
        {/* 업데이트 버튼 */}
        <button type='submit' className='form-btn-update'>
          Update
        </button>
        {/* 취소 버튼 */}
        <button type='button' className='form-btn-cancel' onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditTweetForm;
