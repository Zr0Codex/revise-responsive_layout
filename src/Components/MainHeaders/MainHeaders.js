import React, { useState, useEffect } from 'react';
import { Navbar } from 'react-bootstrap';
import { logout, isLoggedIn } from '../../middleware/authentication';
import { Link } from 'react-router-dom';
import LOGO_BIG from '../../Assets/icons/LOGO-THAILIFE-1.svg';
import profile from '../../Assets/icons/profile.svg';
import { BellOutlined, LogoutOutlined, IdcardOutlined } from '@ant-design/icons';
import DropdownIcon from '../../Assets/icons/DropdownIcons.svg';
import LOGO_SMALL from '../../Assets/icons/LOGO-THAILIFE-2.svg';
import { ContentText } from './MainHeader.style';
import wording from '../../constants/translate/wording';

const CustomHeader = (props) => {
  const [state, setState] = useState(false);
  const [name, setName] = useState('');
  const setFullName = `${localStorage.getItem('firstName')} ${localStorage.getItem(
    'lastName'
  )} (${localStorage.getItem('group_code')})`;
  useEffect(() => {
    setState(isLoggedIn());
    setName(setFullName);
  }, [props]);

  const HandleLogout = () => {
    logout();
    setState(false);
  };

  if (state === false) {
    return (
      <header style={{ height: '65px' }}>
        <Navbar>
          <Link className="navbar-brand" to="/home">
            <img src={LOGO_BIG} alt="React Logo" style={{ marginLeft: '20px' }} />
            <ContentText>{wording.main_header}</ContentText>
          </Link>
        </Navbar>
      </header>
    );
  }

  // return (
  //   <header style={{ height: '65px' }}>
  //     <Navbar>
  //       <Link className='navbar-brand' to='/home'>
  //         <ContentText>
  //           {wording.main_header}
  //         </ContentText>
  //       </Link>
  //     </Navbar>
  //   </header>
  // )
};

export default CustomHeader;
