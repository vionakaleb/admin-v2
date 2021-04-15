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

export default function Adjustment() {
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

  const apiAdjustment = async (e: any) => {
    e.preventDefault();

    const adjustmentParam = {
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
      adjustmentParam,
    );

    if (response.data.errorCode === 0 || username !== '' || amount !== '' || requestType !== '') {
      alert('Input success: ' + response.data.errorMessage);
      window.location.href = '/transaction/instant';
    } else {
      alert('Input failed: ' + response.data.errorMessage);
    }
  };

  return (
    <Layout title="Adjustment">
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
              <div>Adjustment</div>
              <Link href="/transaction/instant">
                <Button size="Small" status="Warning" style={{ display: 'flex' }}>
                  <div style={{ alignSelf: 'center', marginRight: '2px' }}>Back</div>
                  <EvaIcon name="arrow-ios-back" />
                </Button>
              </Link>
            </CardHeader>
            <CardBody>
              <form onSubmit={apiAdjustment}>
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
                    <InputSelectWrapper>
                      Adjustment Type :
                      <InputSelect onChange={({ target }) => setRequestType(target.value)}>
                        <option value="" selected disabled hidden>
                          Adjustment Type
                        </option>
                        {/* Addition */}
                        <option value={3}>Credit Adjustment</option>
                        {/* Subs */}
                        <option value={4}>Debit Adjustment</option>
                      </InputSelect>
                    </InputSelectWrapper>
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
                      Amount :
                      <input
                        type="number"
                        value={amount}
                        onChange={({ target }) => setAmount(target.value)}
                        placeholder="Amount"
                      />
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
                      Channel :
                      <input
                        type="text"
                        value={channel}
                        onChange={({ target }) => setChannel(target.value)}
                        placeholder="Channel"
                      />
                    </InputWrapper>
                    <InputWrapper fullWidth>
                      Reference :
                      <input
                        type="text"
                        value={reference}
                        onChange={({ target }) => setReference(target.value)}
                        placeholder="Reference"
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
                      Bank Name :
                      <input
                        type="text"
                        value={bankName}
                        onChange={({ target }) => setBankName(target.value)}
                        placeholder="Bank Name"
                      />
                    </InputWrapper>
                    <InputWrapper fullWidth>
                      Bank Account :
                      <input
                        type="text"
                        value={bankAccount}
                        onChange={({ target }) => setBankAccount(target.value)}
                        placeholder="Bank Account"
                      />
                    </InputWrapper>
                    <InputWrapper fullWidth>
                      Sender Account Holder :
                      <input
                        type="text"
                        value={senderAccountHolder}
                        onChange={({ target }) => setSenderAccountHolder(target.value)}
                        placeholder="Sender Account Holder"
                      />
                    </InputWrapper>
                    <InputWrapper fullWidth>
                      Sender Account Number :
                      <input
                        type="text"
                        value={senderAccountNumber}
                        onChange={({ target }) => setSenderAccountNumber(target.value)}
                        placeholder="Sender Account Number"
                      />
                    </InputWrapper>
                    <InputWrapper fullWidth>
                      Recipient Account Holder :
                      <input
                        type="text"
                        value={recipientAccountHolder}
                        onChange={({ target }) => setRecipientAccountHolder(target.value)}
                        placeholder="Recipient Account Holder"
                      />
                    </InputWrapper>
                    <InputWrapper fullWidth>
                      Recipient Account Number :
                      <input
                        type="text"
                        value={recipientAccountNumber}
                        onChange={({ target }) => setRecipientAccountNumber(target.value)}
                        placeholder="Recipient Account Number"
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
