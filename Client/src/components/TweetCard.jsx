import React, { memo, useState } from 'react';
import parseDate from '../util/date';
import Avatar from './Avatar';
import EditTweetForm from './EditTweetForm';

const TweetCard = memo(
  ({ tweet, owner, onDelete, onUpdate, onUsernameClick }) => {
    const { id, username, name, url, text, createdAt } = tweet;
    const [editing, setEditing] = useState(false);
    const onClose = () => setEditing(false);

    return (
      <li className='tweet'>
        <section className='tweet-container'>
          {/* 프로필사진 있으면 그걸로 없으면 이름 첫글자로 해주는 함수 */}
          <Avatar url={url} name={name} />
          {/* 트윗 본문을 담은 div */}
          <div className='tweet-body'>
            {/* 사용자 이름 */}
            <span className='tweet-name'>{name}</span>
            {/* 사용자 아이디 (클릭 시 해당 유저의 트윗만 보는 곳으로 이동) */}
            <span
              className='tweet-username'
              onClick={() => onUsernameClick(tweet)}
            >
              @{username}
            </span>
            {/* 트윗 작성 일시 */}
            <span className='tweet-date'> · {parseDate(createdAt)}</span>
             {/* 트윗 본문 */}
            <p>{text}</p>
            {/* 수정 중일 경우 EditTweetForm 컴포넌트를 렌더링 
                이때 아래의 tweet-action-btn인 트윗 수정 버튼을 누를때만 editing이 true로 바뀌면서 실행됨*/}
            {editing && (
              <EditTweetForm
                tweet={tweet}
                onUpdate={onUpdate}
                onClose={onClose} // setEditing(false)를 해서 editing이 false로 변함 즉, 이 html이 사라짐
              />
            )}
          </div>
        </section>
        {/* 트윗 작성자와 현재 로그인한 사용자가 동일한 경우 수정 및 삭제 가능한 버튼 렌더링 */}
        {owner && (
          <div className='tweet-action'>
            {/* 트윗 삭제 버튼 */}
            <button className='tweet-action-btn' onClick={() => onDelete(id)}>
              x
            </button>
            {/* 트윗 수정 버튼 */}
            <button
              className='tweet-action-btn'
              onClick={() => setEditing(true)}
            >
              ✎
            </button>
          </div>
        )}
      </li>
    );
  }
);
export default TweetCard;
