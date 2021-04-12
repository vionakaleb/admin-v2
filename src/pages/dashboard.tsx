import React, { useState, useEffect } from 'react';
import axios from 'axios';
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

export default function Dashboard() {
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    const dashboardParam = {
      dateFrom: '2021-02-01',
      dateTo: '2021-03-31',
    };
    axios
      .post('http://localhost:5000/api/Admin/Dashboard/GetDashboard', dashboardParam)
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        const dataList = data;
        setDataList(dataList);
      })
      .catch(() => {
        console.log('Error retrieving data.');
      });
  }, []);

  const bankList = dataList?.banks;

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const months = ['+0D', '-1D', '+0W', '-1W', 'MTD', 'LastM', 'All'];
  const level = 1;

  const formatterIDR = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'IDR',
  });

  const dataTotalTurnover = formatterIDR.format(dataList.totalTurnover);
  const dataBankBalance = bankList?.map((bank: any) => formatterIDR.format(bank.balance));

  // const groupedBanks = banks.reduce((arrBank, bank) => {
  //   arrBank[bank.level] = [...(arrBank[bank.level] || []), bank];
  //   return arrBank;
  // }, {});

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
                      <TotalWrapper>{formatterIDR.format(dataList.totalDeposit)}</TotalWrapper>
                    </Col>
                  </Row>
                  <Row style={{ alignItems: 'center' }}>
                    <Col breakPoint={{ xs: 12, sm: 6 }}>Total Withdraw</Col>
                    <Col breakPoint={{ xs: 12, sm: 6 }} style={{ textAlign: '-webkit-right' }}>
                      <TotalWrapper>{formatterIDR.format(dataList.totalWithdrawal)}</TotalWrapper>
                    </Col>
                  </Row>
                  <Row style={{ alignItems: 'center' }}>
                    <Col breakPoint={{ xs: 12, sm: 6 }}>Balance</Col>
                    <Col breakPoint={{ xs: 12, sm: 6 }} style={{ textAlign: '-webkit-right' }}>
                      <TotalWrapper>{formatterIDR.format(dataList.balance)}</TotalWrapper>
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
                      <TotalWrapper>{dataList.totalRegistered}</TotalWrapper>
                    </Col>
                  </Row>
                  <Row style={{ alignItems: 'center' }}>
                    <Col breakPoint={{ xs: 12, sm: 6 }}>Total Active</Col>
                    <Col breakPoint={{ xs: 12, sm: 6 }} style={{ textAlign: '-webkit-right' }}>
                      <TotalWrapper>{dataList.totalActive}</TotalWrapper>
                    </Col>
                  </Row>
                  <Row style={{ alignItems: 'center' }}>
                    <Col breakPoint={{ xs: 12, sm: 6 }}>Total Win/Lose</Col>
                    <Col breakPoint={{ xs: 12, sm: 6 }} style={{ textAlign: '-webkit-right' }}>
                      <TotalWrapper>{formatterIDR.format(dataList.totalWinLose)}</TotalWrapper>
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
                  <Row
                    style={{
                      display: 'block',
                      fontSize: '3rem',
                      whiteSpace: 'nowrap',
                      width: '252px',
                      height: '44px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      textAlign: 'center',
                      padding: '5px',
                    }}
                  >
                    {dataTotalTurnover.toString().split('IDR')}
                  </Row>
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
                          onChange={(startDate: any) => setStartDate(startDate)}
                          style={{ position: 'absolute', zIndex: 99 }}
                        />
                      </DateWrapper>
                    </Col>
                    <Col breakPoint={{ xs: 12, md: 6 }}>
                      <DateWrapper>
                        <DatePicker
                          selected={endDate}
                          onChange={(endDate: any) => setEndDate(endDate)}
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
        <Col breakPoint={{ xs: 12, md: 9 }}>
          <Card status="Primary">
            <CardHeader>Level {level}</CardHeader>
            <CardBody>
              <Row>
                {bankList?.map((bank: any) => (
                  <Col breakPoint={{ xs: 12, md: 3 }}>
                    <Card status="Primary" size="Tiny">
                      <CardHeader>{bank.bankCode}</CardHeader>
                      <CardBody>
                        <p>{bank.accountName}</p>
                        <p>{bank.accountNumber}</p>
                        <b>{dataBankBalance.toString().split('IDR')}</b>
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
