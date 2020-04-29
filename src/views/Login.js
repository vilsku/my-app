import React, {useState} from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import {Button} from '@material-ui/core';

const Login = () => {
  const [toggle, setToggle] = useState(true);
  // funktio jolla setToggle true/false
  const showHide = () => {
    setToggle(!toggle);
  };
  return (
    <>
      {toggle ?
        <LoginForm/> :
        <RegisterForm/>
      }
      <Button onClick={showHide}>{toggle ? 'not registered yet? do it here' : 'already registered? log in here'}</Button>
    </>
  );
};

export default Login;
