import React, { memo } from 'react';

// 사진이 없으면 이름의 첫글자 반환해서 표시
const Avatar = memo(({ url, name }) => (
  <div>
    {!!url ? (
      <img src={url} alt='avatar' className='avatar-img' />
    ) : (
      <div className='avatar-txt'>{name.charAt(0)}</div>
    )}
  </div>
));

export default Avatar;
