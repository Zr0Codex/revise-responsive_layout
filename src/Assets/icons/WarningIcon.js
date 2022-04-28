import React from 'react';

const WarningIcon = props => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="15"
    height="15"
    fill="none"
    viewBox="0 0 15 15"
    {...props}
  >
    <path fill="#EC4115" d="M7.5 15a7.5 7.5 0 100-15 7.5 7.5 0 000 15z"></path>
    <path
      fill="#fff"
      stroke="#fff"
      d="M7.513 10.916a.59.59 0 01-.49-.914l-.37-.247.37.247a.588.588 0 11.49.914zM7.512 8.196H7.51a.315.315 0 01-.315-.315h0V4.416a.316.316 0 01.632 0v3.465h0a.314.314 0 01-.315.315zm-.817-3.78v3.465l.817.815a.814.814 0 00.815-.815V4.416a.816.816 0 00-1.632 0z"
    ></path>
  </svg>

)

export default WarningIcon