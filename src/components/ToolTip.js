import React from 'react';
import '../assets/styles/style.scss';

export default function Tooltip({
  width, children, text, ...rest
}) {
  const [show, setShow] = React.useState(false);

  return (
    <div>
      <div className="tooltip" style={show ? { visibility: 'visible', width } : {}}>
        {text}
        <span className="tooltip-arrow" />
      </div>
      <div
        {...rest}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        {children}
      </div>
    </div>
  );
}
