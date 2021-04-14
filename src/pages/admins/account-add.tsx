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
import { EvaIcon } from '@paljs/ui/Icon';

const InputSelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5.6px 0;
`;

const InputSelect = styled.select`
  border-style: solid;
  border-width: 1px;
  width: 100%;
  background-color: #f7f9fc;
  border-color: #e4e9f2;
  color: #222b45;
  border-radius: 0.25rem;
  line-height: 1.5rem;
  padding: 10px;
`;

const InputWrapper = styled(InputGroup)`
  flex-direction: column;
  margin: 5px 0;

  input[type='checkbox'] {
    width: 34px;
    height: 34px;
    border-color: #acbddc !important;
    color: #222b45 !important;
    border-radius: 0.25rem;
    background-color: #f7f9fc;
  }
  input[type='checkbox']:checked {
    width: 34px;
    height: 34px;
    border-color: #acbddc !important;
    color: #222b45 !important;
    border-radius: 0.25rem;
    background-color: #3366ff;
  }
`;

const ButtonWrapper = styled(Button)`
  /* margin: 25px 0; */
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
  const [overrideVpn, setOverrideVpn] = useState(false);

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
    <Layout title="New Admin Form">
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
              <div>New Admin Form</div>
              <Link href="/admins/account">
                <Button size="Small" status="Warning" style={{ display: 'flex' }}>
                  <div style={{ alignSelf: 'center', marginRight: '2px' }}>Back</div>
                  <EvaIcon name="arrow-ios-back" />
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
                    <InputWrapper
                      fullWidth
                      style={{ borderBottom: '1px solid #EDF1F7', paddingBottom: '10px', marginBottom: '10px' }}
                    >
                      <b>Login Details</b>
                    </InputWrapper>
                    <InputWrapper fullWidth>
                      Username :
                      <input
                        type="text"
                        value={username}
                        onChange={({ target }) => setUsername(target.value)}
                        placeholder="Username"
                      />
                    </InputWrapper>
                    <InputWrapper fullWidth>
                      Password :
                      <input
                        type="password"
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                        placeholder="Password"
                      />
                    </InputWrapper>
                    <InputWrapper fullWidth>
                      Confirm Password :
                      <input
                        type="password"
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                        placeholder="Confirm Password"
                      />
                    </InputWrapper>
                    <InputSelectWrapper>
                      Role :
                      <InputSelect>
                        <option value="" selected disabled hidden>
                          Normal Admin
                        </option>
                        {/* <option value={1}>Active</option>
                        <option value={2}>Inactive</option> */}
                      </InputSelect>
                    </InputSelectWrapper>
                    <InputSelectWrapper>
                      Status :
                      <InputSelect>
                        <option value="" selected disabled hidden>
                          Activated
                        </option>
                        {/* <option value={1}>Active</option>
                        <option value={2}>Inactive</option> */}
                      </InputSelect>
                    </InputSelectWrapper>
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
                    <InputWrapper
                      fullWidth
                      style={{ borderBottom: '1px solid #EDF1F7', paddingBottom: '10px', marginBottom: '10px' }}
                    >
                      <b>Personal Details</b>
                    </InputWrapper>
                    <InputWrapper fullWidth>
                      Full Name :
                      <input
                        type="text"
                        value={fullName}
                        onChange={({ target }) => setFullName(target.value)}
                        placeholder="Full Name"
                      />
                    </InputWrapper>
                    <InputWrapper fullWidth>
                      First Name :
                      <input
                        type="text"
                        value={firstName}
                        onChange={({ target }) => setFirstName(target.value)}
                        placeholder="First Name"
                      />
                    </InputWrapper>
                    <InputWrapper fullWidth>
                      Last Name :
                      <input
                        type="text"
                        value={lastName}
                        onChange={({ target }) => setLastName(target.value)}
                        placeholder="Last Name"
                      />
                    </InputWrapper>
                    <InputWrapper fullWidth>
                      Email :
                      <input
                        type="email"
                        value={email}
                        onChange={({ target }) => setEmail(target.value)}
                        placeholder="Email"
                      />
                    </InputWrapper>
                    <InputSelectWrapper>
                      Department :
                      <InputSelect>
                        <option value="" selected disabled hidden>
                          No Department
                        </option>
                        {/* <option value={1}>Active</option>
                        <option value={2}>Inactive</option> */}
                      </InputSelect>
                    </InputSelectWrapper>
                  </Col>
                  <Col
                    breakPoint={{ xs: 12, sm: 6, md: 4 }}
                    style={{
                      textAlign: 'left',
                      marginTop: '44px',
                    }}
                  >
                    <InputWrapper
                      fullWidth
                      style={{ display: 'flex', flexDirection: 'column', height: '60px', marginBottom: '30px' }}
                    >
                      <div>Override VPN :</div>
                      <div>
                        <input
                          type="checkbox"
                          className="inputCheck"
                          checked={overrideVpn}
                          onChange={() => setOverrideVpn(!overrideVpn)}
                        />
                      </div>
                    </InputWrapper>
                    <ButtonWrapper size="Medium" status="Success" type="submit" shape="SemiRound">
                      Submit <EvaIcon name="corner-up-right" />
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
