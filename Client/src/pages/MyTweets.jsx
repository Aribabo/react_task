import React from 'react';
import { useParams } from 'react-router-dom';
import Tweets from '../components/Tweets';

const MyTweets = ({ tweetService }) => {
  // useParams를 사용해 현재 경로의 URL 매개변수 중 username을 가져옴
  const { username } = useParams(); 
  return (
    // getTweets(username)실행
    <Tweets tweetService={tweetService} username={username} addable={false} />
  );
};

export default MyTweets;
