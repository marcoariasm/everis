import React, { useState } from 'react';
import { isEmpty, trim } from 'ramda';

import styled from 'styled-components';
import classNames from 'classnames';

import loading from 'shared/images/loading.svg';
import logo from 'shared/images/iconos/primaWhite.svg';
import sentence from 'shared/images/iconos/ayer-hoy-siempre.svg';

import Button from 'global/components/v1/Button/Button';
import Alert from 'global/components/v1/Alert';

import Image from 'shared/images/imageLogin.svg';
import Input from 'global/components/v1/InputMaterial';

import './style.sass';
import { LoginService } from '../../service/user.services';

const MESSAGE_ERROR_ROLE = 'Tu usuario no está autorizado para ingresar a este aplicativo. Por favor comuníquese con el personal encargado del sistema.';

const Login = () => {
  const [matricula, setMatricula] = useState('');
  const [clave, setClave] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [userWithoutRole, setUserWithoutRole] = useState(false);
  const [formError, setFormError] = useState({
    password: false,
    enrollment: false,
  });

  const isValidField = (fieldValue) => !isEmpty(trim(fieldValue));
  const isValidForm = () => isValidField(matricula) && isValidField(clave);

  const handleOnChange = (e, fn) => {
    fn(e.target.value);
  };

  const handleAuth = async () => {
    setLoading(true);
    try {
      await LoginService(matricula, clave);
      setLoading(false);
    } catch (error) {
      if (error.code === 500) {
        setFormError({ password: true, enrollment: true });
      } else if (error.code === 401) {
        setUserWithoutRole(true);
      }
      setLoading(false);
      setClave('');
    }
  };

  const handleSubmit = (event) => {
    setUserWithoutRole(false);
    setFormError({ password: false, enrollment: false });
    event.preventDefault();
    if (isValidForm()) {
      handleAuth();
    }
  };
  const handleOnInput = (e, cb, state) => {
    const { value, validity: { valid } } = e.target;
    cb(valid ? value : state);
  };

  return (
    <Wrapper
      id="login"
      img={Image}
    >
      <img className="logo" src={logo} alt="logo_prima" />
      <img className="sentence" src={sentence} alt="sentence" />
      <form
        className={classNames('form')}
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <p>Bienvenido(a) a tu plataforma</p>
        <h1 className="title">Inicio de sesión</h1>
        <Input
          label="Matrícula"
          error={formError.enrollment}
          placeholder="Matrícula"
          name="matricula"
          onInput={(e) => handleOnInput(e, setMatricula, matricula)}
          value={matricula}
          textError="Matricula Incorrecta"
          maxLength={6}
          pattern="[a-zA-ZñÑ0-9]"
        />
        <Input
          label="Clave"
          type="password"
          placeholder="Clave"
          name="password"
          error={formError.password}
          onChange={(e) => handleOnChange(e, setClave)}
          value={clave}
          textError="Clave Incorrecta"
        />
        {isLoading && (
          <img
            src={loading}
            alt="Loading"
            style={{ margin: ' 0 auto', display: 'block', marginTop: userWithoutRole ? '10px' : '10px' }}
          />
        )}
        {userWithoutRole && (
          <Alert
            message={MESSAGE_ERROR_ROLE}
            className="inputRegularResponsiveM"
          />
        )}
        {!isLoading && (
          <Button
            type="submit"
            className="btn-login"
            disabled={!isValidForm()}
            style={{
              marginTop: userWithoutRole ? '14px' : '44px',
            }}
          >
            Ingresar
          </Button>
        )}
      </form>
    </Wrapper>
  );
};

export default Login;

const Wrapper = styled.div`
  position: relative;
  background-image: ${({ img }) => `url(${img})`};
  background-size: cover;
  background-repeat: no-repeat;
  height: 100vh;
`;
