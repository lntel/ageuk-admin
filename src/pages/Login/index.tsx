import React, { useContext, useState } from "react";
import "./index.scss";
import Logo from "../../assets/images/age-uk-logo-no-strap.png";
import Textbox from "../../components/Textbox";
import Form from "../../components/Form";
import request from "../../helpers/request";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const { dispatch } = useContext(AuthContext);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    
    e.preventDefault();

    const response = await request({
      type: "POST",
      url: "/auth/login",
      shouldRefresh: false,
      data: {
        emailAddress,
        password
      }
    });

    if(!response.ok) {

      const { message } = await response.json();

      return toast.error(message);
    }

    const { accessToken, refreshToken } = await response.json();

    console.log({
      accessToken,
      refreshToken
    })

    dispatch({
      type: "SET_ACCESS_TOKEN",
      state: {
        accessToken
      }
    });
    
    dispatch({
      type: "SET_REFRESH_TOKEN",
      state: {
        refreshToken
      }
    });
    
    toast.success("Login successful, please wait while you are redirected");

    const timeout = setTimeout(() => {
      
      window.location.href = "/dashboard";

      clearTimeout(timeout);

    }, 3000);
  }

  return (
    <div className="login-container">
      <Form className="login" onSubmit={handleLogin}>
        <img src={Logo} alt="Age UK logo" className="login__logo" />
        <h1 className="login__title">Sign in</h1>
        <Textbox type="email" placeholder="Email Address" required onChange={v => setEmailAddress(v.target.value)} value={emailAddress} />
        <Textbox type="password" placeholder="Password" required onChange={v => setPassword(v.target.value)} value={password} />
        <button type="submit" className="login__submit">
          Sign in
        </button>
        <button type="button" className="login__reset">
          Forgot your password?
        </button>
      </Form>
    </div>
  );
};

export default Login;
