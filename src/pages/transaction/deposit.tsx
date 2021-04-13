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

const InputWrapper = styled(InputGroup)`
  flex-direction: column;
  margin: 5px 0;
`;

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

const ButtonWrapper = styled(Button)`
  margin: 25px 0;
`;

export default function Deposit() {
  const [userLogin] = useState('testadmin');
  const [whiteLabelCode, setWhiteLabelCode] = useState('');
  const [username, setUsername] = useState('');
  const [channel, setChannel] = useState('');
  const [reference, setReference] = useState('');
  const [amount, setAmount] = useState('');
  const [bankName, setBankName] = useState('');
  const [bankAccount, setBankAccount] = useState('');
  const [senderAccountHolder, setSenderAccountHolder] = useState('');
  const [senderAccountNumber, setSenderAccountNumber] = useState('');
  const [recipientAccountHolder, setRecipientAccountHolder] = useState('');
  const [recipientAccountNumber, setRecipientAccountNumber] = useState('');

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
    }
  }, []);

  const apiDeposit = async (e: any) => {
    e.preventDefault();

    const depositParam = {
      UserLogin: userLogin,
      Transaction: {
        WhiteLabelCode: whiteLabelCode,
        UserName: username,
        Channel: channel,
        Reference: reference,
        Amount: amount,
        BankName: bankName,
        BankAccount: bankAccount,
        RequestType: 1,
        SenderAccountHolder: senderAccountHolder,
        SenderAccountNumber: senderAccountNumber,
        RecipientAccountHolder: recipientAccountHolder,
        RecipientAccountNumber: recipientAccountNumber,
      },
    };

    const response = await axios.post('http://localhost:5000/api/Admin/Transaction/RequestTransaction/', depositParam);

    if (response.data.errorCode === 0 || username !== '' || amount !== '') {
      alert('Input success: ' + response.data.errorMessage);
      window.location.href = '/transaction/instant';
    } else {
      alert('Input failed: ' + response.data.errorMessage);
    }
  };

  return (
    <Layout title="Deposit">
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
              <div>Deposit</div>
              <Link href="/transaction/instant">
                <Button size="Small" status="Warning" style={{ display: 'flex' }}>
                  <div style={{ alignSelf: 'center', marginRight: '2px' }}>Back</div>
                  <EvaIcon name="arrow-ios-back" />
                </Button>
              </Link>
            </CardHeader>
            <CardBody>
              <form onSubmit={apiDeposit}>
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
                      Channel :
                      <input type="text" value={channel} onChange={({ target }) => setChannel(target.value)} />
                    </InputWrapper>
                    <InputWrapper fullWidth>
                      Reference :
                      <input type="text" value={reference} onChange={({ target }) => setReference(target.value)} />
                    </InputWrapper>
                    <InputWrapper fullWidth>
                      White Label Code :
                      <input
                        type="text"
                        value={whiteLabelCode}
                        onChange={({ target }) => setWhiteLabelCode(target.value)}
                      />
                    </InputWrapper>
                    <InputWrapper fullWidth>
                      Amount :
                      <input type="number" value={amount} onChange={({ target }) => setAmount(target.value)} />
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
                      Bank Name :
                      <input type="text" value={bankName} onChange={({ target }) => setBankName(target.value)} />
                    </InputWrapper>
                    <InputWrapper fullWidth>
                      Bank Account :
                      <input
                        type="number"
                        value={bankAccount}
                        onChange={({ target }) => setBankAccount(target.value)}
                      />
                    </InputWrapper>
                    <InputWrapper fullWidth>
                      Sender Account Holder :
                      <input
                        type="text"
                        value={senderAccountHolder}
                        onChange={({ target }) => setSenderAccountHolder(target.value)}
                      />
                    </InputWrapper>
                    <InputWrapper fullWidth>
                      Sender Account Number :
                      <input
                        type="number"
                        value={senderAccountNumber}
                        onChange={({ target }) => setSenderAccountNumber(target.value)}
                      />
                    </InputWrapper>
                    <InputWrapper fullWidth>
                      Recipient Account Holder (Office) :
                      <input
                        type="text"
                        value={recipientAccountHolder}
                        onChange={({ target }) => setRecipientAccountHolder(target.value)}
                      />
                    </InputWrapper>
                    <InputWrapper fullWidth>
                      Recipient Account Number (Office) :
                      <input
                        type="number"
                        value={recipientAccountNumber}
                        onChange={({ target }) => setRecipientAccountNumber(target.value)}
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
                    <ButtonWrapper size="Medium" status="Primary" type="submit" shape="SemiRound" fullWidth>
                      Submit
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
