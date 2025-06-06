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
import { useRouter } from 'next/router';

const InputWrapper = styled(InputGroup)`
  flex-direction: column;
  margin: 5px 0;
`;

const InputRadioWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px 0;
`;

const InputRadio = styled.div`
  flex-direction: column;
  width: 100%;
  color: #222b45;
  padding: 10px 0;
`;

const ButtonWrapper = styled(Button)`
  margin: 25px 0;
`;

export default function NewMember() {
  const router = useRouter();
  const { id: dataId } = router.query;

  const [action] = useState('Add');
  const [userLogin] = useState('testadmin');
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
  const [memberTag, setMemberTag] = useState('');

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
        Id: dataId,
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

    if (response.data.errorCode === 0 || username !== '' || password !== '') {
      alert('Input success: ' + response.data.errorMessage);
      window.location.href = '/members/list';
    } else {
      alert('Input failed: ' + response.data.errorMessage);
    }
  };

  return (
    <Layout title="New Member">
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
              <div>New Member</div>
              <Link href="/members/list">
                <Button size="Small" status="Warning" style={{ display: 'flex' }}>
                  <div style={{ alignSelf: 'center', marginRight: '2px' }}>Back</div>
                  <EvaIcon name="arrow-ios-back" />
                </Button>
              </Link>
            </CardHeader>
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
                    <InputWrapper fullWidth>
                      Currency Code :
                      <input
                        type="text"
                        value={currencyCode}
                        onChange={({ target }) => setCurrencyCode(target.value)}
                        placeholder="Currency Code"
                      />
                    </InputWrapper>
                    <InputWrapper fullWidth>
                      Referral Code :
                      <input
                        type="text"
                        value={referralReference}
                        onChange={({ target }) => setReferralReference(target.value)}
                        placeholder="Referral Code"
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
                    <InputWrapper
                      fullWidth
                      style={{ borderBottom: '1px solid #EDF1F7', paddingBottom: '10px', marginBottom: '10px' }}
                    >
                      <b>Personal Details</b>
                    </InputWrapper>
                    <InputWrapper fullWidth>
                      White Label Code :
                      <input
                        type="text"
                        value={whiteLabelCode}
                        onChange={({ target }) => setWhiteLabelCode(target.value)}
                        placeholder="White Label Code"
                      />
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
                      Email :
                      <input
                        type="email"
                        value={email}
                        onChange={({ target }) => setEmail(target.value)}
                        placeholder="Email"
                      />
                    </InputWrapper>
                    <InputWrapper fullWidth>
                      Contact :
                      <input
                        type="text"
                        value={contact}
                        onChange={({ target }) => setContact(target.value)}
                        placeholder="Contact"
                      />
                    </InputWrapper>
                    <InputWrapper fullWidth>
                      Contact 2 :
                      <input
                        type="text"
                        value={contact2}
                        onChange={({ target }) => setContact2(target.value)}
                        placeholder="Contact 2"
                      />
                    </InputWrapper>
                    <InputRadioWrapper>
                      Gender :
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
                    </InputRadioWrapper>
                    <InputWrapper fullWidth>
                      Date of Birth :
                      <input
                        type="text"
                        value={dateOfBirth}
                        onChange={({ target }) => setDateOfBirth(target.value)}
                        placeholder="Date of Birth"
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
                    <InputWrapper
                      fullWidth
                      style={{ borderBottom: '1px solid #EDF1F7', paddingBottom: '10px', marginBottom: '10px' }}
                    >
                      <b>Member Details</b>
                    </InputWrapper>
                    <InputRadioWrapper>
                      Member Tags :
                      <InputRadio>
                        {/* {memberTags.map((tag) => tag.memberTags)} */}
                        <div>
                          <input
                            type="radio"
                            name="myRadios"
                            onChange={({ target }) => setMemberTag(target.value)}
                            value="1"
                          />{' '}
                          Tag
                        </div>
                        <div>
                          <input
                            type="radio"
                            name="myRadios"
                            onChange={({ target }) => setMemberTag(target.value)}
                            value="2"
                          />{' '}
                          Tag 2
                        </div>
                      </InputRadio>
                    </InputRadioWrapper>
                    <ButtonWrapper size="Medium" status="Success" type="submit" shape="SemiRound" fullWidth>
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
