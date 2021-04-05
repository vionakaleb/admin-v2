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
  margin: 5.6px 0;
`;

export default function SaveTransaction() {
  const [Action, setAction] = useState('Add');
  const [UserLogin, setUserLogin] = useState('testadmin');
  const [ApprovalStatus, setApprovalStatus] = useState('');
  const [WhiteLabelCode, setWhiteLabelCode] = useState('');
  const [MemberUserName, setMemberUserName] = useState('');
  const [PrefixUserName, setPrefixUserName] = useState('');
  const [Amount, setAmount] = useState('');
  const [RequestType, setRequestType] = useState('');

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
    }
  }, []);

  const apiSaveTransaction = async (e: any) => {
    e.preventDefault();
    const transaction = {
      Action: Action,
      UserLogin: UserLogin,
      Transaction: {
        ApprovalStatus: ApprovalStatus,
        WhiteLabelCode: WhiteLabelCode,
        MemberUserName: MemberUserName,
        PrefixUserName: PrefixUserName,
        Amount: Amount,
        RequestType: RequestType,
      },
    };

    const response = await axios.post('http://localhost:5000/api/Admin/Transaction/SaveTransaction/', transaction);
    // console.log('transaction response:', response.data);

    if (response.data.errorCode === 0) {
      alert(response.data.errorMessage);
      window.location.href = '/transaction/instant';
    } else {
      alert(response.data.errorMessage);
    }
  };

  return (
    <Layout title="Save Transaction">
      <Row center="xs">
        <Col breakPoint={{ xs: 12, md: 9 }}>
          <Card>
            <CardHeader>Save Transaction</CardHeader>
            <CardBody>
              <form onSubmit={apiSaveTransaction}>
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
                        value={MemberUserName}
                        onChange={({ target }) => setMemberUserName(target.value)}
                        placeholder="Member Username:"
                      />
                    </InputWrapper>
                    <InputWrapper fullWidth>
                      <input
                        type="text"
                        value={PrefixUserName}
                        onChange={({ target }) => setPrefixUserName(target.value)}
                        placeholder="Prefix Username:"
                      />
                    </InputWrapper>
                    <InputWrapper fullWidth>
                      <input
                        type="text"
                        value={WhiteLabelCode}
                        onChange={({ target }) => setWhiteLabelCode(target.value)}
                        placeholder="White Label Code:"
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
                    <InputSelect onChange={({ target }) => setRequestType(target.value)}>
                      <option value="" selected disabled hidden>
                        Method:
                      </option>
                      <option value={1}>Deposit</option>
                      <option value={2}>Withdraw</option>
                      <option value={3}>Addition</option>
                      <option value={4}>Subs</option>
                    </InputSelect>
                    <InputSelect onChange={({ target }) => setApprovalStatus(target.value)}>
                      <option value="" selected disabled hidden>
                        Status:
                      </option>
                      <option value={1}>Pending</option>
                      <option value={2}>Approve</option>
                      <option value={3}>Reject</option>
                    </InputSelect>
                    <InputWrapper fullWidth>
                      <input
                        type="number"
                        value={Amount}
                        onChange={({ target }) => setAmount(target.value)}
                        placeholder="Credit:"
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
                      Save Transaction
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
