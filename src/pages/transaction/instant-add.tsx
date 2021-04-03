import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@paljs/ui/Button';
import { InputGroup } from '@paljs/ui/Input';

import Layout from 'Layouts';
import { Card, CardBody, CardHeader } from '@paljs/ui/Card';
import Row from '@paljs/ui/Row';
import Col from '@paljs/ui/Col';

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
      alert('Success');
      window.location.href = '/dashboard';
    } else {
      alert('Fail Login');
    }
  };

  return (
    <Layout title="Login">
      <Row center="xs">
        <Col breakPoint={{ xs: 12, md: 9 }}>
          <Card>
            <CardBody>
              <form onSubmit={apiLogin}>
                <Row>
                  <Col
                    breakPoint={{ xs: 12, sm: 6, md: 4 }}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      flexWrap: 'wrap',
                      justifyContent: 'space-evenly',
                    }}
                  >
                    <InputGroup fullWidth>
                      <input
                        type="text"
                        value={MemberUserName}
                        onChange={({ target }) => setUsername(target.value)}
                        placeholder="User Name"
                      />
                      {/* DONE */}
                    </InputGroup>
                    <InputGroup fullWidth>
                      <input
                        type="password"
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                        placeholder="Password"
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
                  </Col>
                  <Col
                    breakPoint={{ xs: 12, sm: 6, md: 4 }}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      flexWrap: 'wrap',
                      justifyContent: 'space-evenly',
                    }}
                  >
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
                    <InputGroup fullWidth>
                      <input
                        type="password"
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                        placeholder="Password"
                      />
                    </InputGroup>
                  </Col>
                  <Col
                    breakPoint={{ xs: 12, sm: 6, md: 4 }}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      flexWrap: 'wrap',
                      justifyContent: 'space-evenly',
                    }}
                  >
                    <Button status="Success" type="submit" shape="SemiRound" fullWidth>
                      <a>Login</a>
                    </Button>
                  </Col>
                </Row>
              </form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
}
