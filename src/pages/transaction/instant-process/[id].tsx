import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Button } from '@paljs/ui/Button';
import { InputGroup } from '@paljs/ui/Input';

import Layout from 'Layouts';
import { Card, CardBody, CardHeader } from '@paljs/ui/Card';
import Row from '@paljs/ui/Row';
import Col from '@paljs/ui/Col';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { EvaIcon } from '@paljs/ui/Icon';

const InputWrapper = styled(InputGroup)`
  flex-direction: column;
  margin: 5px 0;
`;

// const InputSelectWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   margin: 5.6px 0;
// `;

// const InputSelect = styled.select`
//   border-style: solid;
//   border-width: 1px;
//   width: 100%;
//   background-color: #f7f9fc;
//   border-color: #e4e9f2;
//   color: #222b45;
//   border-radius: 0.25rem;
//   line-height: 1.5rem;
//   padding: 10px;
// `;

const ButtonWrapper = styled(Button)`
  margin: 5px;
  width: 46%;
`;

export default function ProcessTransaction() {
  const router = useRouter();
  const { id: dataId } = router.query;

  const [userLogin] = useState('testadmin');
  const [whiteLabelCode, setWhiteLabelCode] = useState('');
  const [username, setUsername] = useState('');
  const [approvalStatus] = useState('');
  const [remark, setRemark] = useState('');

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
    }
  }, []);

  const apiApproveTransaction = async (e: any) => {
    e.preventDefault();
    const processTransactionParam = {
      UserLogin: userLogin,
      Transaction: {
        Id: dataId,
        WhiteLabelCode: whiteLabelCode,
        UserName: username,
        ApprovalStatus: 2,
        Remark: remark,
      },
    };

    const response = await axios.post(
      'http://localhost:5000/api/Admin/Transaction/ProcessTransaction/',
      processTransactionParam,
    );

    if (response.data.errorCode === 0 || username !== '' || approvalStatus !== '' || remark !== '') {
      alert('Input success: ' + response.data.errorMessage);
      window.location.href = '/transaction/instant';
    } else {
      alert('Input failed: ' + response.data.errorMessage);
    }
  };

  const apiRejectTransaction = async (e: any) => {
    e.preventDefault();
    const processTransactionParam = {
      UserLogin: userLogin,
      Transaction: {
        Id: dataId,
        WhiteLabelCode: whiteLabelCode,
        UserName: username,
        ApprovalStatus: 3,
        Remark: remark,
      },
    };

    const response = await axios.post(
      'http://localhost:5000/api/Admin/Transaction/ProcessTransaction/',
      processTransactionParam,
    );

    if (response.data.errorCode === 0 || username !== '' || remark !== '') {
      alert('Input success: ' + response.data.errorMessage);
      window.location.href = '/transaction/instant';
    } else {
      alert('Input failed: ' + response.data.errorMessage);
    }
  };

  return (
    <Layout title="Process Transaction">
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
              <div>Process Transaction</div>
              <Link href="/transaction/instant">
                <Button size="Small" status="Warning" style={{ display: 'flex' }}>
                  <div style={{ alignSelf: 'center', marginRight: '2px' }}>Back</div>
                  <EvaIcon name="arrow-ios-back" />
                </Button>
              </Link>
            </CardHeader>
            <CardBody>
              <form>
                <Row
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'start',
                  }}
                >
                  <Col
                    breakPoint={{ xs: 12, sm: 6 }}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      flexWrap: 'wrap',
                      justifyContent: 'center',
                    }}
                  >
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
                      Submitted By :
                      <input
                        type="text"
                        value={username}
                        onChange={({ target }) => setUsername(target.value)}
                        placeholder={username}
                      />
                    </InputWrapper>
                    <InputWrapper fullWidth>
                      Remark :
                      <input
                        type="text"
                        value={remark}
                        onChange={({ target }) => setRemark(target.value)}
                        placeholder="Remark"
                      />
                    </InputWrapper>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'start',
                        marginTop: '20px',
                      }}
                    >
                      <ButtonWrapper size="Medium" status="Success" shape="SemiRound" onClick={apiApproveTransaction}>
                        Approve <EvaIcon name="corner-up-right" />
                      </ButtonWrapper>
                      <ButtonWrapper size="Medium" status="Danger" shape="SemiRound" onClick={apiRejectTransaction}>
                        Reject <EvaIcon name="corner-up-right" />
                      </ButtonWrapper>
                    </div>
                    <ButtonWrapper
                      size="Medium"
                      status="Secondary"
                      shape="SemiRound"
                      onClick={typeof location !== 'undefined' ? location.reload : null}
                    >
                      Refresh <EvaIcon name="corner-up-right" />
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
