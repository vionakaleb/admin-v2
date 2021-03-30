import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@paljs/ui/Button';
import { InputGroup } from '@paljs/ui/Input';
import { Checkbox } from '@paljs/ui/Checkbox';
import Link from 'next/link';

import Auth, { Group } from 'components/Auth';
import Socials from 'components/Auth/Socials';
import Layout from 'Layouts';

export default function Login() {
  const onCheckbox = () => {
    // v will be true or false
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      userName: 'testadmin',
      passWord: 'test1234',
    };
    const response = await axios.post('http://localhost:5000/api/Admin/login', user);
    // set the state of the user
    setUser(response.data);
    // store the user in localStorage
    localStorage.setItem('user', JSON.stringify(response.data));
    window.location.href = '/dashboard';
  };

  return (
    <Layout title="Login">
      <Auth title="Login" subTitle="Hello! Login with your email">
        <form onSubmit={handleSubmit}>
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
          <Group>
            <Checkbox checked onChange={onCheckbox}>
              Remember me
            </Checkbox>
            <Link href="/auth/request-password">
              <a>Forgot Password?</a>
            </Link>
          </Group>
          <Button status="Success" type="submit" shape="SemiRound" fullWidth>
            <Link href="/dashboard">
              <a>Login</a>
            </Link>
          </Button>
        </form>
        <Socials />
        <p>
          Don&apos;t have account?{' '}
          <Link href="/">
            <a>Register</a>
          </Link>
        </p>
      </Auth>
    </Layout>
  );
}
