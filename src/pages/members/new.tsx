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

const InputRadio = styled.div`
  width: 100%;
  color: #222b45;
  padding: 10px;
  margin: 5px 0;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  padding: 0 10px;
  margin: 5px 0;
`;

export default function NewMember() {
  const [action, setAction] = useState('Add');
  const [userLogin, setUserLogin] = useState('testadmin');
  //   const [id, setId] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [whiteLabelCode, setWhiteLabelCode] = useState('');
  const [email, setEmail] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [fullName, setFullName] = useState('');
  const [gender, setGender] = useState('');
  const [contact, setContact] = useState('');
  const [contact2, setContact2] = useState('');
  const [currencyCode, setCurrencyCode] = useState('');
  const [referralReference, setReferralReference] = useState('');

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
    }
  }, []);

  const apiNewMember = async (e: any) => {
    e.preventDefault();
    const newMemberParam = {
      Action: action,
      UserLogin: userLogin,
      Member: {
        // Id: id,
        UserName: username,
        PassWord: password,
        WhiteLabelCode: whiteLabelCode,
        Email: email,
        DateOfBirth: dateOfBirth,
        FullName: fullName,
        Gender: gender,
        Contact: contact,
        Contact2: contact2,
        CurrencyCode: currencyCode,
        ReferralReference: referralReference,
      },
    };

    const response = await axios.post('http://localhost:5000/api/Admin/Member/SaveMember/', newMemberParam);
    // console.log('Member response:', response.data);

    if (response.data.errorCode === 0 || username !== '' || password !== '') {
      alert(response.data.errorMessage);
      window.location.href = '/members/list';
    } else {
      alert(response.data.errorMessage);
    }
  };

  return (
    <Layout title="New Member">
      <Row center="xs">
        <Col breakPoint={{ xs: 12, md: 9 }}>
          <Card>
            <CardHeader>New Member</CardHeader>
            <CardBody>
              <form onSubmit={apiNewMember}>
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
                        value={fullName}
                        onChange={({ target }) => setFullName(target.value)}
                        placeholder="Full Name:"
                      />
                    </InputWrapper>
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
                        type="email"
                        value={email}
                        onChange={({ target }) => setEmail(target.value)}
                        placeholder="Email:"
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
                    <InputRadio>
                      <input
                        type="radio"
                        name="myRadios"
                        onChange={({ target }) => setGender(target.value)}
                        value="1"
                      />{' '}
                      Male
                      <input
                        type="radio"
                        name="myRadios"
                        onChange={({ target }) => setGender(target.value)}
                        value="2"
                        style={{ marginLeft: '20px' }}
                      />{' '}
                      Female
                    </InputRadio>
                    <InputWrapper fullWidth>
                      <input
                        type="text"
                        value={dateOfBirth}
                        onChange={({ target }) => setDateOfBirth(target.value)}
                        placeholder="Date of Birth:"
                      />
                    </InputWrapper>
                    <InputWrapper fullWidth>
                      <input
                        type="text"
                        value={contact}
                        onChange={({ target }) => setContact(target.value)}
                        placeholder="Contact:"
                      />
                    </InputWrapper>
                    <InputWrapper fullWidth>
                      <input
                        type="text"
                        value={contact2}
                        onChange={({ target }) => setContact2(target.value)}
                        placeholder="Contact 2:"
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
                        value={whiteLabelCode}
                        onChange={({ target }) => setWhiteLabelCode(target.value)}
                        placeholder="White Label Code:"
                      />
                    </InputWrapper>
                    <InputWrapper fullWidth>
                      <input
                        type="text"
                        value={currencyCode}
                        onChange={({ target }) => setCurrencyCode(target.value)}
                        placeholder="Currency Code:"
                      />
                    </InputWrapper>
                    <InputWrapper fullWidth>
                      <input
                        type="text"
                        value={referralReference}
                        onChange={({ target }) => setReferralReference(target.value)}
                        placeholder="Referral Code:"
                      />
                    </InputWrapper>
                    <ButtonWrapper>
                      <Button size="Medium" status="Success" type="submit" shape="SemiRound" fullWidth>
                        Add New Member
                      </Button>
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
