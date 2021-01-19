import React from 'react';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import Login from './index'

const RecaptchaLogin = () => {
  return (
    <GoogleReCaptchaProvider
      useRecaptchaNet
      reCaptchaKey={process.env.REACT_APP_RECAPTCHA_SITEKEY}
    >
      <Login />
    </GoogleReCaptchaProvider>
  );
};

export default RecaptchaLogin;