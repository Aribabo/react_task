import React, { memo, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Banner from './Banner';
import NewTweetForm from './NewTweetForm';
import TweetCard from './TweetCard';
import { useAuth } from '../context/AuthContext';

const Tweets = memo(({ tweetService, username, addable }) => {
  //tweets state 배열로 생성
  const [tweets, setTweets] = useState([]);
  // error state 생성
  const [error, setError] = useState('');
  // 현재 url 받아온다고 이해하면 될듯
  const history = useHistory();
  // 현재 사용자의 정보를 가져옴
  const { user } = useAuth();

  //  컴포넌트가 마운트될 때와 tweetService, username, user가 변경될 때 트윗 데이터를 가져오고, 실시간으로 업데이트되는 트윗을 수신
  useEffect(() => {
    tweetService
      .getTweets(username)
      // 가져온 트윗을 tweets에 재저장
      .then((tweets) => setTweets([...tweets]))
      .catch(onError);
//트윗의 생성 이벤트를 구독하고, 새로운 트윗이 생성되면 onCreated 함수가 호출되어 트윗 목록에 새로운 트윗이 추가
// 이때 () => this.io.off(event)라는 함수가 리턴됨

    const stopSync = tweetService.onSync((tweet) => onCreated(tweet));
    // 이벤트 리스너를 정리하는 함수를 리턴
    return () => stopSync();
  }, [tweetService, username, user]);

  // tweets에 tweet추가
  const onCreated = (tweet) => {
    setTweets((tweets) => [tweet, ...tweets]);
  };

  const onDelete = (tweetId) =>
    tweetService
      .deleteTweet(tweetId)
      .then(() =>
      // 삭제하면 tweets에 해당 글 제외하고 재저장
        setTweets((tweets) => tweets.filter((tweet) => tweet.id !== tweetId))
      )
      .catch((error) => setError(error.toString())); // 오류가 발생하면 에러 상태 업데이트

  const onUpdate = (tweetId, text) =>
    tweetService
      .updateTweet(tweetId, text)
      .then((updated) =>
        setTweets((tweets) =>
        // 업데이트가 성공하면 해당 트윗을 목록에서 갱신
          tweets.map((item) => (item.id === updated.id ? updated : item))
        )
      )
      .catch((error) => error.toString());
// 사용자 이름을 클릭했을 때 호출되는 함수 -> 해당유저의 글만 보여주는 경로로 이동
  const onUsernameClick = (tweet) => history.push(`/${tweet.username}`);
// 오류 메시지를 잠시 동안 보여주고 숨기는 함수
  const onError = (error) => {
    setError(error.toString()); // 오류가 발생하면 에러 상태 업데이트
    setTimeout(() => {
      setError('');
    }, 3000);
  };

  return (
    <>
      {/* 트윗 추가 폼을 보여주는 조건부 렌더링 */}
      {/* NewTweetForm은 새로운 트윗을 작성하는 from태그 반환 */}
      {addable && (
        <NewTweetForm tweetService={tweetService} onError={onError} />
      )}
      {/* 오류 메시지가 있다면 Banner실행 에러 text가 들어있는 p태그 생성 */}
      {error && <Banner text={error} isAlert={true} transient={true} />}
      {/* 트윗이 하나도 없는 경우 보여주는 문구 */}
      {tweets.length === 0 && <p className='tweets-empty'>No Tweets Yet</p>}
      <ul className='tweets'>
        {/* //트윗 목록을 순회하며 각각의 트윗을 보여주는 TweetCard 컴포넌트를 렌더링
            map을 사용해서 배열의 각 요소별로 TweetCard가 실행됨 */ }
        {tweets.map((tweet) => (
          <TweetCard
            key={tweet.id}
            tweet={tweet}
            owner={tweet.username === user.username}
            onDelete={onDelete}
            onUpdate={onUpdate}
            onUsernameClick={onUsernameClick}
          />
        ))}
      </ul>
    </>
  );
});
export default Tweets;
