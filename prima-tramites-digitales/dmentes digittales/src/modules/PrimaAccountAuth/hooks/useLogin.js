import React, { useState } from "react";
import {LoginService} from "../services/auth.service";
import {always, ifElse, prop, propEq} from "ramda";

const DEFAULT_ERROR_MESSAGE = `El número de tu documento de identidad y/o clave web es incorrecto. Por favor, intenta nuevamente`
const RECAPTCHA_ERROR_CODE = 428

export default function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loginSubmit = async ({ token, documentTypeSelected, document, password }) => {
    setLoading(true);
    try {
      const user = await LoginService(token, documentTypeSelected.name, document, password)
      setLoading(false);
      setError('');
    } catch (error) {
      const errorMessage = ifElse(
        propEq('status', RECAPTCHA_ERROR_CODE),
        prop('message'),
        always(DEFAULT_ERROR_MESSAGE)
      )(error)
      setError(errorMessage);
      setLoading(false);
    }
  };

  return {
    loginSubmit,
    loading,
    error
  }
};