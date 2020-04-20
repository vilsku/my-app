import React from "react";
import useLoginForm from "../hooks/LoginHooks";
import { login } from "../hooks/ApiHooks";

const LoginForm = () => {
  const doLogin = () => {
      login(inputs);
  };
  const { inputs, handleInputChange, handleSubmit } = useLoginForm(doLogin);
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

export default LoginForm;
