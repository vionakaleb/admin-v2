import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Card } from '@paljs/ui/Card';
import { Button } from '@paljs/ui/Button';
import { InputGroup } from '@paljs/ui/Input';

import Auth from 'components/Auth';

const PageWrapper = styled.div`
  background: url('https://images.unsplash.com/photo-1465146633011-14f8e0781093?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3450&q=80');
  color: #eee;
  width: 100%;
  height: 98vh;
  display: flex;
  justify-content: center;
  align-items: center;
  perspective: 1000px;
  perspective-origin: 50% 50%;
  animation: animation 100s linear infinite;

  @keyframes animation {
    100% {
      background-position: 0px -3000px;
    }
  }
`;

const LayoutWrapper = styled(Card)`
  text-align: center;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif,
    'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  color: #fff;

  h1 {
    margin: 10px;
  }
  p {
    margin: 0 0 30px 0;
  }
`;

const InputWrapper = styled(InputGroup)`
  input {
    border-style: solid;
    border-width: 1px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif,
      'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
    -webkit-appearance: none;
    -webkit-transition-duration: 0.15s;
    transition-duration: 0.15s;
    -webkit-transition-property: border, background-color, color, box-shadow;
    transition-property: border, background-color, color, box-shadow;
    -webkit-transition-timing-function: ease-in;
    transition-timing-function: ease-in;
    width: 94%;
    background-color: #f7f9fc;
    border-color: #e4e9f2;
    color: #222b45;
    border-radius: 0.25rem;
    font-size: 0.9375rem;
    font-weight: 600;
    line-height: 1.5rem;
    padding: 0.4375rem 1.125rem;
  }
`;

const ButtonWrapper = styled(Button)`
  letter-spacing: 0.4px;
  text-align: center;
  -webkit-text-decoration: none;
  text-decoration: none;
  display: inline-block;
  white-space: nowrap;
  vertical-align: middle;
  cursor: pointer;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif,
    'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  font-weight: 700;
  font-size: 0.875rem;
  line-height: 3rem;
  border-radius: 0.75rem;
  width: 100%;
  border-style: solid;
  border-width: 0.0625rem;
  text-transform: uppercase;
  background-color: #3366ff;
  border-color: #3366ff;
  color: #ffffff;
`;

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState();

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, []);

  const apiLogin = async (e: any) => {
    e.preventDefault();
    const user = {
      userName: username,
      passWord: password,
    };
    const response = await axios.post('http://localhost:5000/api/Admin/login', user);
    localStorage.setItem('user', JSON.stringify(response.data));
    setUser(response.data);

    if (username === null || username === '' || password === null || password === '') {
      alert('Login info must be filled.');
    } else {
      if (response.data.errorCode === 0) {
        alert('Login:' + response.data.errorMessage);
        window.location.href = '/dashboard';
      } else {
        alert('Login:' + response.data.errorMessage);
      }
    }
  };

  return (
    <PageWrapper>
      <Auth>
        <LayoutWrapper>
          <h1>Login</h1>
          <p>Hello! Login with your email</p>
          <form onSubmit={apiLogin}>
            <InputWrapper>
              <input
                type="text"
                value={username}
                onChange={({ target }) => setUsername(target.value)}
                placeholder="Username"
              />
            </InputWrapper>
            <InputWrapper>
              <input
                type="password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                placeholder="Password"
              />
            </InputWrapper>
            <ButtonWrapper status="Primary" type="submit" shape="SemiRound" fullWidth>
              Login
            </ButtonWrapper>
          </form>
        </LayoutWrapper>
      </Auth>
    </PageWrapper>
  );
}
