import React from 'react';
import { ReactComponent as ArrowSvg } from '../assets/icons/arrow-right.svg';

function SeeMore(props) {
  return (
    <div className="seeMore" {...props}>
      See more
      <ArrowSvg />
    </div>
  );
}

export default SeeMore;
