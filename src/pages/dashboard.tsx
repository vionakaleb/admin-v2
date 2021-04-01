import React, { useState } from 'react';
import Link from 'next/link';
import Layout from 'Layouts';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Card, CardBody, CardHeader } from '@paljs/ui/Card';
import Row from '@paljs/ui/Row';
import Col from '@paljs/ui/Col';
import { InputGroup } from '@paljs/ui/Input';
import { Button } from '@paljs/ui/Button';

export default function Dashboard() {
  const DateWrapper = styled(InputGroup)`
    margin-bottom: 5px;

    .react-datepicker {
      position: absolute;
      z-index: 99;
    }

    input {
      width: 100%;
    }
  `;

  const TotalWrapper = styled(Button)`
    border-radius: 100px;
    width: fit-content;
    padding: 3px 10px;
    margin: 0;
    font-weight: normal;
    cursor: auto;
  `;

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const months = ['+0D', '-1D', '+0W', '-1W', 'MTD', 'LastM', 'All'];
  const totalDeposit = 50000;
  const totalWithdrawal = 0;
  const totalBalance = 50000;
  const totalRegistered = 0;
  const totalActive = 0;
  const totalWinLose = 0;
  const totalTurnover = 0;
  const banks = [
    {
      level: 1,
      bankCode: 11111,
      bankName: 'BCA',
      bankAccount: '1234567890',
      bankBalance: 1100000000,
    },
    // {
    //   level: 1,
    //   bankCode: 22222,
    //   bankName: 'BNI',
    //   bankAccount: '2345678901',
    //   bankBalance: 2200000000,
    // },
    {
      level: 2,
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

  const groupedBanks = banks.reduce((arrBank, bank) => {
    arrBank[bank.level] = [...(arrBank[bank.level] || []), bank];
    return arrBank;
  }, {});

  console.log('banks:', banks);
  console.log('groupedBanks:', groupedBanks);

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
                    <Col breakPoint={{ xs: 12, sm: 6 }} style={{ textAlign: '-webkit-right' }}>
                      <TotalWrapper>{formatterIDR.format(totalDeposit)}</TotalWrapper>
                    </Col>
                  </Row>
                  <Row style={{ alignItems: 'center' }}>
                    <Col breakPoint={{ xs: 12, sm: 6 }}>Total Withdraw</Col>
                    <Col breakPoint={{ xs: 12, sm: 6 }} style={{ textAlign: '-webkit-right' }}>
                      <TotalWrapper>{formatterIDR.format(totalWithdrawal)}</TotalWrapper>
                    </Col>
                  </Row>
                  <Row style={{ alignItems: 'center' }}>
                    <Col breakPoint={{ xs: 12, sm: 6 }}>Balance</Col>
                    <Col breakPoint={{ xs: 12, sm: 6 }} style={{ textAlign: '-webkit-right' }}>
                      <TotalWrapper>{formatterIDR.format(totalBalance)}</TotalWrapper>
                    </Col>
                  </Row>
                </Col>
                <Col
                  breakPoint={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                  style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', justifyContent: 'space-evenly' }}
                >
                  <Row style={{ alignItems: 'center' }}>
                    <Col breakPoint={{ xs: 12, sm: 6 }}>Total Registered</Col>
                    <Col breakPoint={{ xs: 12, sm: 6 }} style={{ textAlign: '-webkit-right' }}>
                      <TotalWrapper>{totalRegistered}</TotalWrapper>
                    </Col>
                  </Row>
                  <Row style={{ alignItems: 'center' }}>
                    <Col breakPoint={{ xs: 12, sm: 6 }}>Total Active</Col>
                    <Col breakPoint={{ xs: 12, sm: 6 }} style={{ textAlign: '-webkit-right' }}>
                      <TotalWrapper>{totalActive}</TotalWrapper>
                    </Col>
                  </Row>
                  <Row style={{ alignItems: 'center' }}>
                    <Col breakPoint={{ xs: 12, sm: 6 }}>Total Win/Lose</Col>
                    <Col breakPoint={{ xs: 12, sm: 6 }} style={{ textAlign: '-webkit-right' }}>
                      <TotalWrapper>{formatterIDR.format(totalWinLose)}</TotalWrapper>
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
                  <Row style={{ fontSize: '3.2rem' }}>{formatter.format(totalTurnover) + '.00'}</Row>
                </Col>
                <Col
                  breakPoint={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                  style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', justifyContent: 'center' }}
                >
                  <Row>
                    <Col breakPoint={{ xs: 12, md: 6 }}>
                      <DateWrapper>
                        <DatePicker
                          selected={startDate}
                          onChange={(startDate) => setStartDate(startDate)}
                          style={{ position: 'absolute', zIndex: 99 }}
                        />
                      </DateWrapper>
                    </Col>
                    <Col breakPoint={{ xs: 12, md: 6 }}>
                      <DateWrapper>
                        <DatePicker
                          selected={endDate}
                          onChange={(endDate) => setEndDate(endDate)}
                          style={{ position: 'absolute', zIndex: 99 }}
                        />
                      </DateWrapper>
                    </Col>
                  </Row>
                  <small>
                    <Row style={{ justifyContent: 'space-evenly', marginBottom: '10px' }}>
                      {months.map((month) => (
                        <Col breakPoint={{ xs: 1.7 }}>
                          <Link href="/dashboard">{month}</Link>
                        </Col>
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
        {banks.map((bank) => (
          <Col breakPoint={{ xs: 12, md: 9 }}>
            <Card status="Primary">
              <CardHeader>{bank.level}</CardHeader>
              <CardBody>
                <Row>
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
                </Row>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </Layout>
  );
}
