import React from "react";
import "./index.scss";
import Logo from "../../assets/images/age-uk-logo-no-strap.png";
import Textbox from "../../components/Textbox";
import Form from "../../components/Form";

const Login = () => {
  return (
    <div className="login-container">
      <Form className="login" onSubmit={() => console.log("test")}>
        <img src={Logo} alt="Age UK logo" className="login__logo" />
        <h1 className="login__title">Sign in</h1>
        <Textbox type="email" placeholder="Email Address" required />
        <Textbox type="password" placeholder="Password" required />
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
