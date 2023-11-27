import React from 'react';
import Tweets from '../components/Tweets';
// getTweets(username)실행
const AllTweets = ({ tweetService }) => (
  <Tweets tweetService={tweetService} addable={true} />
);

export default AllTweets;
