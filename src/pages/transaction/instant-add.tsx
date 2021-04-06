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

export default function AddTransaction() {
  const [action] = useState('Add');
  const [userLogin] = useState('testadmin');
  const [approvalStatus, setApprovalStatus] = useState('');
  const [whiteLabelCode, setWhiteLabelCode] = useState('');
  const [memberUsername, setMemberUserName] = useState('');
  const [prefixUsername, setPrefixUserName] = useState('');
  const [amount, setAmount] = useState('');
  const [requestType, setRequestType] = useState('');

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
    }
  }, []);

  const apiAddTransaction = async (e: any) => {
    e.preventDefault();
    const addTransactionParam = {
      Action: action,
      UserLogin: userLogin,
      Transaction: {
        ApprovalStatus: approvalStatus,
        WhiteLabelCode: whiteLabelCode,
        MemberUserName: memberUsername,
        PrefixUserName: prefixUsername,
        Amount: amount,
        RequestType: requestType,
      },
    };

    const response = await axios.post(
      'http://localhost:5000/api/Admin/Transaction/SaveTransaction/',
      addTransactionParam,
    );

    if (
      response.data.errorCode === 0 ||
      memberUsername !== '' ||
      amount !== '' ||
      approvalStatus !== '' ||
      requestType !== ''
    ) {
      alert('Input: ' + response.data.errorMessage);
      window.location.href = '/transaction/instant';
    } else {
      alert('Input: ' + response.data.errorMessage);
    }
  };

  return (
    <Layout title="Add Transaction">
      <Row center="xs">
        <Col breakPoint={{ xs: 12, md: 9 }}>
          <Card>
            <CardHeader>Add Transaction</CardHeader>
            <CardBody>
              <form onSubmit={apiAddTransaction}>
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
                      Member Username :
                      <input
                        type="text"
                        value={memberUsername}
                        onChange={({ target }) => setMemberUserName(target.value)}
                      />
                    </InputWrapper>
                    <InputWrapper fullWidth>
                      Prefix Username :
                      <input
                        type="text"
                        value={prefixUsername}
                        onChange={({ target }) => setPrefixUserName(target.value)}
                      />
                    </InputWrapper>
                    <InputWrapper fullWidth>
                      White Label Code :
                      <input
                        type="text"
                        value={whiteLabelCode}
                        onChange={({ target }) => setWhiteLabelCode(target.value)}
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
                    <InputSelectWrapper>
                      Status :
                      <InputSelect onChange={({ target }) => setApprovalStatus(target.value)}>
                        <option value="" selected disabled hidden></option>
                        <option value={1}>Pending</option>
                        <option value={2}>Approve</option>
                        <option value={3}>Reject</option>
                      </InputSelect>
                    </InputSelectWrapper>
                    <InputWrapper fullWidth>
                      Credit :
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
                    <ButtonWrapper size="Medium" status="Primary" type="submit" shape="SemiRound" fullWidth>
                      Save Transaction
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
