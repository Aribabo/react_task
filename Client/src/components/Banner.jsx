import React, { memo } from 'react';
// 오류발생시 뜨는 베너 여기는 오류가 아니면 green이라고하지만 사실 쓰일일이 없음 
// 오류가 있으면 p태그 생성 내용은 text로 받은 내용
const Banner = memo(({ text, isAlert }) => (
  <>
    {text && (
      <p className={`banner ${isAlert ? 'banner-red' : 'banner-green'}`}>
        {text}
      </p>
    )}
  </>
));
export default Banner;
