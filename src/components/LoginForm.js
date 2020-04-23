import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import useLoginForm from '../hooks/LoginHooks';
import {login} from '../hooks/ApiHooks';
import {withRouter} from 'react-router-dom';
import {MediaContext} from '../contexts/MediaContext';

const LoginForm = ({history}) => {
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useContext(MediaContext)
  const doLogin = async () => {
    try {
      const userdata = await login(inputs);
      setUser(userdata.user);
      // console.log(user);
      // tallenna token
      localStorage.setItem('token', userdata.token);
      // siirry etusivulle
      history.push('/home');
    } catch (e) {
      console.log(e.message);
      // TODO: näytä vihe
    }
  };
  const {inputs, handleInputChange, handleSubmit} = useLoginForm(doLogin);
  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleInputChange}
          value={inputs.username}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleInputChange}
          value={inputs.password}
        />
        <button type="submit">Login</button>
      </form>
    </>
  );
};

LoginForm.propTypes = {
  history: PropTypes.object,
};

export default withRouter(LoginForm);
