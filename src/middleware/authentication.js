import { message } from 'antd';
import axios from 'axios';
import wording from '../constants/translate/wording';

const text = useFormatMessage();

export const login = (props, data) => {
  if (data.usename && data.password) {
    let user = {
      usename: data.usename,
      password: data.password
    };
    const api_login = process.env.REACT_APP_API_LOGIN_GATEWAY_ENDPOINT;
    axios
      .post(api_login, user)
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('emp_id', response.data.employee_id);
        localStorage.setItem('firstName', response.data.firstName);
        localStorage.setItem('lastName', response.data.lastName);
        localStorage.setItem('role', response.data.group_code);
        localStorage.setItem('group_code', response.data.group_code);
        localStorage.setItem('group_menu', JSON.stringify(response.data.group_menu));

        props.history.push('/home');
        message.success(wording.login_success);
      })
      .catch((error) => {
        message.error(wording.login_failed);
      });
  } else {
    message.error(wording.input_empty);
  }
};

export const logout = () => {
  localStorage.clear();
};

export const isLoggedIn = () => {
  if (localStorage.getItem('token')) return true;
  return false;
};
