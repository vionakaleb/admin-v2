import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Button } from '@paljs/ui/Button';
import { InputGroup } from '@paljs/ui/Input';

import Layout from 'Layouts';
import { Card, CardBody, CardHeader } from '@paljs/ui/Card';
import Row from '@paljs/ui/Row';
import Col from '@paljs/ui/Col';
import Link from 'next/link';

const InputWrapper = styled(InputGroup)`
  flex-direction: column;
  margin: 5px 0;
`;

const ButtonWrapper = styled(Button)`
  margin: 25px 0;
`;

export default function AddAdmin() {
  const [action] = useState('Add');
  const [userLogin] = useState('testadmin');
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

    if (response.data.errorCode === 0 || username !== '' || password !== '') {
      alert('Input success: ' + response.data.errorMessage);
      window.location.href = '/admins/account';
    } else {
      alert('Input failed: ' + response.data.errorMessage);
    }
  };

  return (
    <Layout title="Add Admin Account">
      <Row center="xs">
        <Col breakPoint={{ xs: 12, md: 9 }}>
          <Card>
            <CardHeader
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignContent: 'flex-end',
                justifyContent: 'space-between',
              }}
            >
              <div>Add Admin Account</div>
              <Link href="/admins/account">
                <Button size="Small" status="Warning">
                  Back
                </Button>
              </Link>
            </CardHeader>
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
                      Username :
                      <input type="text" value={username} onChange={({ target }) => setUsername(target.value)} />
                    </InputWrapper>
                    <InputWrapper fullWidth>
                      Password :
                      <input type="password" value={password} onChange={({ target }) => setPassword(target.value)} />
                    </InputWrapper>
                    <InputWrapper fullWidth>
                      Email :
                      <input type="email" value={email} onChange={({ target }) => setEmail(target.value)} />
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
                      First Name :
                      <input type="text" value={firstName} onChange={({ target }) => setFirstName(target.value)} />
                    </InputWrapper>
                    <InputWrapper fullWidth>
                      Last Name :
                      <input type="text" value={lastName} onChange={({ target }) => setLastName(target.value)} />
                    </InputWrapper>
                    <InputWrapper fullWidth>
                      Full Name :
                      <input type="text" value={fullName} onChange={({ target }) => setFullName(target.value)} />
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
                    <ButtonWrapper size="Medium" status="Primary" type="submit" shape="SemiRound" fullWidth>
                      Save Admin Account
                    </ButtonWrapper>
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
