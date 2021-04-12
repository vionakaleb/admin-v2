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

export default function RequestTransaction() {
  const [userLogin] = useState('testadmin');
  const [whiteLabelCode, setWhiteLabelCode] = useState('');
  const [username, setUsername] = useState('');
  const [channel, setChannel] = useState('');
  const [reference, setReference] = useState('');
  const [amount, setAmount] = useState('');
  const [bankName, setBankName] = useState('');
  const [bankAccount, setBankAccount] = useState('');
  const [requestType, setRequestType] = useState('');
  const [senderAccountHolder, setSenderAccountHolder] = useState('');
  const [senderAccountNumber, setSenderAccountNumber] = useState('');
  const [recipientAccountHolder, setRecipientAccountHolder] = useState('');
  const [recipientAccountNumber, setRecipientAccountNumber] = useState('');

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
    }
  }, []);

  const apiRequestTransaction = async (e: any) => {
    e.preventDefault();

    const requestTransactionParam = {
      UserLogin: userLogin,
      Transaction: {
        WhiteLabelCode: whiteLabelCode,
        UserName: username,
        Channel: channel,
        Reference: reference,
        Amount: amount,
        BankName: bankName,
        BankAccount: bankAccount,
        RequestType: requestType,
        SenderAccountHolder: senderAccountHolder,
        SenderAccountNumber: senderAccountNumber,
        RecipientAccountHolder: recipientAccountHolder,
        RecipientAccountNumber: recipientAccountNumber,
      },
    };

    const response = await axios.post(
      'http://localhost:5000/api/Admin/Transaction/RequestTransaction/',
      requestTransactionParam,
    );

    if (response.data.errorCode === 0 || username !== '' || amount !== '' || requestType !== '') {
      alert('Input success: ' + response.data.errorMessage);
      window.location.href = '/transaction/instant';
    } else {
      alert('Input failed: ' + response.data.errorMessage);
    }
  };

  return (
    <Layout title="Request Transaction">
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
              <div>Request Transaction</div>
              <Link href="/transaction/instant">
                <Button size="Small" status="Warning">
                  Back
                </Button>
              </Link>
            </CardHeader>
            <CardBody>
              <form onSubmit={apiRequestTransaction}>
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
                      White Label Code :
                      <input
                        type="text"
                        value={whiteLabelCode}
                        onChange={({ target }) => setWhiteLabelCode(target.value)}
                      />
                    </InputWrapper>
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
                      Amount :
                      <input type="number" value={amount} onChange={({ target }) => setAmount(target.value)} />
                    </InputWrapper>
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
                    <InputSelectWrapper>
                      Method :
                      <InputSelect onChange={({ target }) => setRequestType(target.value)}>
                        <option value="" selected disabled hidden></option>
                        <option value={1}>Deposit</option>
                        <option value={2}>Withdraw</option>
                        <option value={3}>Addition</option>
                        <option value={4}>Subs</option>
                      </InputSelect>
                    </InputSelectWrapper>
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
                      Recipient Account Holder :
                      <input
                        type="text"
                        value={recipientAccountHolder}
                        onChange={({ target }) => setRecipientAccountHolder(target.value)}
                      />
                    </InputWrapper>
                    <InputWrapper fullWidth>
                      Recipient Account Number :
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
                      Request Transaction
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
