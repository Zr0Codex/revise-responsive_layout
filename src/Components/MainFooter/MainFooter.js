import React from 'react';
import wording from '../../constants/translate/wording';
var style = {
  fontSize: '22px',
  color: '#999999',
  textAlign: 'center',
  padding: '20px',
  position: 'fixed',
  left: '35%',
  bottom: '0',
  height: '65px',
  width: '420px'
};

const CustomFooter = () => {
  return (
    <div>
      <div style={style}>{wording.footer}</div>
    </div>
  );
};
export default CustomFooter;
