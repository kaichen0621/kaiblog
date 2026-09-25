import React from 'react';
import PopularVideosPopup from '@site/src/components/PopularVideosPopup';

export default function Root({children}) {
  return (
    <React.Fragment>
      <PopularVideosPopup />
      {children}
    </React.Fragment>
  );
}
