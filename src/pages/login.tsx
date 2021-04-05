import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@paljs/ui/Button';
import { InputGroup } from '@paljs/ui/Input';

import Auth, { Group } from 'components/Auth';
import Socials from 'components/Auth/Socials';
import Layout from 'Layouts';

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

    // console.log('login response:', response.data);

    if (response.data.errorCode === 0) {
      alert(response.data.errorMessage);
      window.location.href = '/dashboard';
    } else {
      alert(response.data.errorMessage);
    }
  };

  return (
    <Layout title="Login">
      <Auth title="Login" subTitle="Hello! Login with your email">
        <form onSubmit={apiLogin}>
          <InputGroup fullWidth>
            <input
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
              placeholder="Username"
            />
          </InputGroup>
          <InputGroup fullWidth>
            <input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              placeholder="Password"
            />
          </InputGroup>
          <Group></Group>
          <Button status="Success" type="submit" shape="SemiRound" fullWidth>
            Login
          </Button>
        </form>
        <Socials />
      </Auth>
    </Layout>
  );
}
