import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import useSignUpForm from '../hooks/RegisterHooks';
import {checkUserAvailable, login, register} from '../hooks/ApiHooks';
import {withRouter} from 'react-router-dom';
import {MediaContext} from '../contexts/MediaContext';
import {Button, TextField, Grid} from '@material-ui/core';

const RegisterForm = ({history}) => {
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useContext(MediaContext);
  const doRegister = async () => {
    try {
      await checkUserAvailable(inputs.username);
      await register(inputs);
      // kirjaudu automaagisesti
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

  const {inputs, handleInputChange, handleSubmit} = useSignUpForm(doRegister);
  return (
    <Grid container>
      <Grid item>
        <h1>Register</h1>
      </Grid>
      <Grid item xs={12}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid container item xs={12}>
              <TextField
                fullWidth
                type="text"
                name="username"
                placeholder="Username"
                onChange={handleInputChange}
                value={inputs.username}
              />
            </Grid>

            <Grid container item xs={12}>
              <TextField
                fullWidth
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleInputChange}
                value={inputs.password}
              />
            </Grid>

            <Grid container item xs={12}>
              <TextField
                fullWidth
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleInputChange}
                value={inputs.email}
              />
            </Grid>

            <Grid container item xs={12}>
              <TextField
                fullWidth
                type="text"
                name="full_name"
                placeholder="Full name"
                onChange={handleInputChange}
                value={inputs.full_name}
              />
            </Grid>

            <Grid container item xs={12}>
              <Button
                fullWidth
                color="primary"
                type="submit"
                variant="outlined"
              >
                Register
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

RegisterForm.propTypes = {
  history: PropTypes.object,
};

export default withRouter(RegisterForm);
