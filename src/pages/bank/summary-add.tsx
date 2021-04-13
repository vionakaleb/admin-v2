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
  margin: 25px 0;
`;

export default function AddSummary() {
  const [action] = useState('Add');
  const [userLogin] = useState('testadmin');
  //   const [id, setId] = useState('');
  const [whiteLabelCode, setWhiteLabelCode] = useState('');
  const [bankTypeCode, setBankTypeCode] = useState('');
  const [bankName, setBankName] = useState('');
  const [bankAccountName, setBankAccountName] = useState('');
  const [bankNumber, setBankNumber] = useState('');
  const [bankSerial, setBankSerial] = useState('');
  const [maxDeposit, setMaxDeposit] = useState('');
  const [maxWithdraw, setMaxWithdraw] = useState('');
  const [minDeposit, setMinDeposit] = useState('');
  const [minWithdraw, setMinWithdraw] = useState('');
  const [deposit, setDeposit] = useState(false);
  const [withdraw, setWithdraw] = useState(false);
  const [sortNumber, setSortNumber] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
    }
  }, []);

  const apiAddSummary = async (e: any) => {
    e.preventDefault();

    const summaryAddParam = {
      Action: action,
      UserLogin: userLogin,
      Bank: {
        // Id: id,
        WhiteLabelCode: whiteLabelCode,
        BankTypeCode: bankTypeCode,
        BankName: bankName,
        BankAccountName: bankAccountName,
        BankNumber: bankNumber,
        BankSerial: bankSerial,
        MaxDeposit: maxDeposit,
        MaxWithdraw: maxWithdraw,
        MinDeposit: minDeposit,
        MinWithdraw: minWithdraw,
        Deposit: deposit,
        Withdraw: withdraw,
        SortNumber: sortNumber,
        Status: status,
      },
    };

    const response = await axios.post('http://localhost:5000/api/Admin/Bank/SaveBank/', summaryAddParam);

    if (
      response.data.errorCode === 0 ||
      response.data.Bank.BankName !== '' ||
      response.data.Bank.BankAccountName !== ''
    ) {
      alert('Input success: ' + response.data.errorMessage);
      window.location.href = '/bank/summary';
    } else {
      alert('Input failed: ' + response.data.errorMessage);
    }
  };

  return (
    <Layout title="Add Bank Summary">
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
              <div>Add Bank Summary</div>
              <Link href="/bank/summary">
                <Button size="Small" status="Warning" style={{ display: 'flex' }}>
                  <div style={{ alignSelf: 'center', marginRight: '2px' }}>Back</div>
                  <EvaIcon name="arrow-ios-back" />
                </Button>
              </Link>
            </CardHeader>
            <CardBody>
              <form onSubmit={apiAddSummary}>
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
                      Bank Type Code :
                      <input
                        type="text"
                        value={bankTypeCode}
                        onChange={({ target }) => setBankTypeCode(target.value)}
                      />
                    </InputWrapper>
                    <InputWrapper fullWidth>
                      Bank Name :
                      <input type="text" value={bankName} onChange={({ target }) => setBankName(target.value)} />
                    </InputWrapper>
                    <InputWrapper fullWidth>
                      Bank Account Name :
                      <input
                        type="text"
                        value={bankAccountName}
                        onChange={({ target }) => setBankAccountName(target.value)}
                      />
                    </InputWrapper>
                    <InputWrapper fullWidth>
                      Bank Number :
                      <input type="text" value={bankNumber} onChange={({ target }) => setBankNumber(target.value)} />
                    </InputWrapper>
                    <InputWrapper fullWidth>
                      Bank Serial :
                      <input type="text" value={bankSerial} onChange={({ target }) => setBankSerial(target.value)} />
                    </InputWrapper>
                    <InputSelectWrapper>
                      Status :
                      <InputSelect onChange={({ target }) => setStatus(target.value)}>
                        <option value="" selected disabled hidden></option>
                        <option value={1}>Active</option>
                        <option value={2}>Inactive</option>
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
                    <InputWrapper fullWidth>
                      Max Deposit :
                      <input type="text" value={maxDeposit} onChange={({ target }) => setMaxDeposit(target.value)} />
                    </InputWrapper>
                    <InputWrapper fullWidth>
                      Max Withdraw :
                      <input type="text" value={maxWithdraw} onChange={({ target }) => setMaxWithdraw(target.value)} />
                    </InputWrapper>
                    <InputWrapper fullWidth>
                      Min Deposit :
                      <input type="text" value={minDeposit} onChange={({ target }) => setMinDeposit(target.value)} />
                    </InputWrapper>
                    <InputWrapper fullWidth>
                      Min Withdraw :
                      <input type="text" value={minWithdraw} onChange={({ target }) => setMinWithdraw(target.value)} />
                    </InputWrapper>
                    <InputWrapper fullWidth>
                      Deposit :
                      <input
                        type="checkbox"
                        className="inputCheck"
                        checked={deposit}
                        onChange={() => setDeposit(!deposit)}
                      />
                    </InputWrapper>
                    <InputWrapper fullWidth>
                      Withdraw :
                      <input
                        type="checkbox"
                        className="inputCheck"
                        checked={withdraw}
                        onChange={() => setWithdraw(!withdraw)}
                      />
                    </InputWrapper>
                    <InputWrapper fullWidth>
                      Sort Number :
                      <input type="text" value={sortNumber} onChange={({ target }) => setSortNumber(target.value)} />
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
                      Save Bank Summary
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
