import React from 'react';
import Layout from 'Layouts';
import styled from 'styled-components';
import { Card, CardBody, CardHeader } from '@paljs/ui/Card';
import Row from '@paljs/ui/Row';
import Col from '@paljs/ui/Col';
import { InputGroup } from '@paljs/ui/Input';
import { Button } from '@paljs/ui/Button';

export default function Dashboard() {
  const Input = styled(InputGroup)`
    margin-bottom: 10px;
  `;

  const months = ['+0D', '-1D', '+0W', '-1W', 'MTD', 'LastM', 'All'];
  const totalDeposit = 50000;
  const totalWithdrawal = 0;
  const totalBalance = 50000;
  const totalRegistered = 0;
  const totalActive = 0;
  const totalWinLose = 0;
  const totalTurnover = 0;
  const bankLevel = 'Level 1';
  const banks = [
    {
      bankCode: 11111,
      bankName: 'BCA',
      bankAccount: '1234567890',
      bankBalance: 1100000000,
    },
    {
      bankCode: 22222,
      bankName: 'BNI',
      bankAccount: '2345678901',
      bankBalance: 2200000000,
    },
    {
      bankCode: 33333,
      bankName: 'Mandiri',
      bankAccount: '3456789012',
      bankBalance: 3300000000,
    },
  ];

  const formatterIDR = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'IDR',
  });
  const formatter = new Intl.NumberFormat('en-US', {
    maximumSignificantDigits: 3,
  });

  return (
    <Layout title="Dashboard">
      <Row center="xs">
        <Col breakPoint={{ xs: 12, md: 9 }}>
          <Card>
            <CardBody>
              <Row>
                <Col
                  breakPoint={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                  style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', justifyContent: 'space-evenly' }}
                >
                  <Row style={{ alignItems: 'center' }}>
                    <Col breakPoint={{ xs: 12, sm: 6 }}>Total Deposit</Col>
                    <Col breakPoint={{ xs: 12, sm: 6 }} style={{ textAlign: 'right' }}>
                      {formatterIDR.format(totalDeposit)}
                    </Col>
                  </Row>
                  <Row style={{ alignItems: 'center' }}>
                    <Col breakPoint={{ xs: 12, sm: 6 }}>Total Withdraw</Col>
                    <Col breakPoint={{ xs: 12, sm: 6 }} style={{ textAlign: 'right' }}>
                      {formatterIDR.format(totalWithdrawal)}
                    </Col>
                  </Row>
                  <Row style={{ alignItems: 'center' }}>
                    <Col breakPoint={{ xs: 12, sm: 6 }}>Balance</Col>
                    <Col breakPoint={{ xs: 12, sm: 6 }} style={{ textAlign: 'right' }}>
                      {formatterIDR.format(totalBalance)}
                    </Col>
                  </Row>
                </Col>
                <Col
                  breakPoint={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                  style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', justifyContent: 'space-evenly' }}
                >
                  <Row style={{ alignItems: 'center' }}>
                    <Col breakPoint={{ xs: 12, sm: 6 }}>Total Registered</Col>
                    <Col breakPoint={{ xs: 12, sm: 6 }} style={{ textAlign: 'right' }}>
                      {totalRegistered}
                    </Col>
                  </Row>
                  <Row style={{ alignItems: 'center' }}>
                    <Col breakPoint={{ xs: 12, sm: 6 }}>Total Active</Col>
                    <Col breakPoint={{ xs: 12, sm: 6 }} style={{ textAlign: 'right' }}>
                      {totalActive}
                    </Col>
                  </Row>
                  <Row style={{ alignItems: 'center' }}>
                    <Col breakPoint={{ xs: 12, sm: 6 }}>Total Win/Lose</Col>
                    <Col breakPoint={{ xs: 12, sm: 6 }} style={{ textAlign: 'right' }}>
                      {formatterIDR.format(totalWinLose)}
                    </Col>
                  </Row>
                </Col>
                <Col
                  breakPoint={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                  }}
                >
                  <Row>Total Turnover</Row>
                  <Row>IDR</Row>
                  <Row>{formatter.format(totalTurnover) + '.00'}</Row>
                </Col>
                <Col
                  breakPoint={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                  style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', justifyContent: 'center' }}
                >
                  <Row>
                    <Col breakPoint={{ xs: 12, md: 6 }}>
                      <Input fullWidth>
                        <input type="text" />
                      </Input>
                    </Col>
                    <Col breakPoint={{ xs: 12, md: 6 }}>
                      <Input fullWidth>
                        <input type="text" />
                      </Input>
                    </Col>
                  </Row>
                  <small>
                    <Row style={{ justifyContent: 'space-evenly' }}>
                      {months.map((month) => (
                        <Col breakPoint={{ xs: 1.5 }}>{month}</Col>
                      ))}
                    </Row>
                  </small>
                  <Row style={{ flexDirection: 'column', alignContent: 'center' }}>
                    <Button size="Medium" status="Warning" style={{ width: '90%' }}>
                      Search
                    </Button>
                  </Row>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row center="xs">
        <Col breakPoint={{ xs: 12, md: 9 }}>
          <Card status="Primary">
            <CardHeader>{bankLevel}</CardHeader>
            <CardBody>
              <Row>
                {banks.map((bank) => (
                  <Col breakPoint={{ xs: 12, md: 3 }}>
                    <Card status="Primary" size="Tiny">
                      <CardHeader>{bank.bankCode}</CardHeader>
                      <CardBody>
                        <p>{bank.bankName}</p>
                        <p>{bank.bankAccount}</p>
                        <b>{formatter.format(bank.bankBalance) + '.00'}</b>
                      </CardBody>
                    </Card>
                  </Col>
                ))}
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
}
