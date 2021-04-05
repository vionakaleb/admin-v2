import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Button } from '@paljs/ui/Button';
import { InputGroup } from '@paljs/ui/Input';

import Layout from 'Layouts';
import { Card, CardBody, CardHeader } from '@paljs/ui/Card';
import Row from '@paljs/ui/Row';
import Col from '@paljs/ui/Col';

const InputWrapper = styled(InputGroup)`
  margin: 5px 0;
`;

export default function AddAdmin() {
  const [action, setAction] = useState('Add');
  const [userLogin, setUserLogin] = useState('testadmin');
  //   const [id, setId] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [fullName, setFullName] = useState('');

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
    }
  }, []);

  const apiAddAdmin = async (e: any) => {
    e.preventDefault();
    const adminAddParam = {
      Action: action,
      UserLogin: userLogin,
      User: {
        // Id: id,
        UserName: username,
        PassWord: password,
        Email: email,
        FirstName: firstName,
        LastName: lastName,
        FullName: fullName,
      },
    };

    const response = await axios.post('http://localhost:5000/api/Admin/Admin/SaveUser/', adminAddParam);
    // console.log('account response:', response.data);

    if (response.data.errorCode === 0 || username !== '' || password !== '') {
      alert(response.data.errorMessage);
      window.location.href = '/admins/account';
    } else {
      alert(response.data.errorMessage);
    }
  };

  return (
    <Layout title="Add Admin Account">
      <Row center="xs">
        <Col breakPoint={{ xs: 12, md: 9 }}>
          <Card>
            <CardHeader>Add Admin Account</CardHeader>
            <CardBody>
              <form onSubmit={apiAddAdmin}>
                <Row>
                  <Col
                    breakPoint={{ xs: 12, sm: 6, md: 4 }}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      flexWrap: 'wrap',
                      justifyContent: 'start',
                    }}
                  >
                    <InputWrapper fullWidth>
                      <input
                        type="text"
                        value={username}
                        onChange={({ target }) => setUsername(target.value)}
                        placeholder="Username:"
                      />
                    </InputWrapper>
                    <InputWrapper fullWidth>
                      <input
                        type="password"
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                        placeholder="Password:"
                      />
                    </InputWrapper>
                    <InputWrapper fullWidth>
                      <input
                        type="email"
                        value={email}
                        onChange={({ target }) => setEmail(target.value)}
                        placeholder="Email:"
                      />
                    </InputWrapper>
                  </Col>
                  <Col
                    breakPoint={{ xs: 12, sm: 6, md: 4 }}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      flexWrap: 'wrap',
                      justifyContent: 'start',
                    }}
                  >
                    <InputWrapper fullWidth>
                      <input
                        type="text"
                        value={firstName}
                        onChange={({ target }) => setFirstName(target.value)}
                        placeholder="FirstName:"
                      />
                    </InputWrapper>
                    <InputWrapper fullWidth>
                      <input
                        type="text"
                        value={lastName}
                        onChange={({ target }) => setLastName(target.value)}
                        placeholder="Last Name:"
                      />
                    </InputWrapper>
                    <InputWrapper fullWidth>
                      <input
                        type="text"
                        value={fullName}
                        onChange={({ target }) => setFullName(target.value)}
                        placeholder="Full Name:"
                      />
                    </InputWrapper>
                  </Col>
                  <Col
                    breakPoint={{ xs: 12, sm: 6, md: 4 }}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      flexWrap: 'wrap',
                      justifyContent: 'start',
                      margin: '5px 0',
                      padding: '0 25px',
                    }}
                  >
                    <Button size="Medium" status="Success" type="submit" shape="SemiRound" fullWidth>
                      Save Admin Account
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
