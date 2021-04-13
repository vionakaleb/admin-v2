import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled, { DefaultTheme } from 'styled-components';
import Select from '@paljs/ui/Select';
import { LayoutHeader } from '@paljs/ui/Layout';
import { EvaIcon } from '@paljs/ui/Icon';
import { Button } from '@paljs/ui/Button';
import { Actions } from '@paljs/ui/Actions';
import ContextMenu from '@paljs/ui/ContextMenu';
import User from '@paljs/ui/User';
import { breakpointDown } from '@paljs/ui/breakpoints';
// import axios from 'axios';

const HeaderStyle = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  ${breakpointDown('sm')`
    .right{
      display: none;
    }
  `}
  .right > div {
    height: auto;
    display: flex;
    align-content: center;
  }
  .logo {
    font-size: 1.25rem;
    white-space: nowrap;
    text-decoration: none;
  }
  .left {
    display: flex;
    align-items: center;
    .github {
      font-size: 18px;
      margin-right: 5px;
    }
  }
`;

const Label = styled.span`
  display: flex;
  align-items: center;
`;

const SelectStyled = styled(Select)`
  min-width: 150px;
`;

interface HeaderProps {
  toggleSidebar: () => void;
  theme: {
    set: (value: DefaultTheme['name']) => void;
    value: DefaultTheme['name'];
  };
}

const Header: React.FC<HeaderProps> = (props) => {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState();

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, []);

  if (typeof window !== 'undefined') {
    if (user) {
      console.log('Logged in.', user);
    } else {
      console.log('Not logged in.');
      // window.location.href = '/login';
    }
  }

  const apiLogout = () => {
    setUser({});
    setUsername('');
    setPassword('');
    localStorage.clear();
    window.location.href = '/login';
  };

  const isLogout = user && (
    <div style={{ display: 'flex' }}>
      <User image="url('/icons/icon-72x72.png')" name={user?.userName} title="Admin" size="Medium" />
      <Button size="Small" shape="SemiRound" onClick={apiLogout} style={{ marginLeft: '10px' }}>
        Log Out
      </Button>
    </div>
  );

  const themeOptions = () => [
    {
      value: 'default',
      label: (
        <Label>
          <EvaIcon name="droplet" options={{ fill: '#a6c1ff' }} />
          Style 1
        </Label>
      ),
    },
    {
      value: 'dark',
      label: (
        <Label>
          <EvaIcon name="droplet" options={{ fill: '#192038' }} />
          Style 2
        </Label>
      ),
    },
    {
      value: 'cosmic',
      label: (
        <Label>
          <EvaIcon name="droplet" options={{ fill: '#5a37b8' }} />
          Style 3
        </Label>
      ),
    },
  ];
  return (
    <LayoutHeader fixed>
      <HeaderStyle>
        <Actions
          size="Medium"
          actions={[
            {
              icon: { name: 'menu-2-outline' },
              url: {
                onClick: props.toggleSidebar,
              },
            },
            {
              content: (
                <Link href="/">
                  <a className="logo">SuperAdmin</a>
                </Link>
              ),
            },
            {
              content: (
                <Link href="/members/new">
                  <Button size="Small" shape="Round">
                    <EvaIcon name="person-add" options={{ height: '25px', animation: { type: 'shake' } }} /> New Member
                  </Button>
                </Link>
              ),
            },
            {
              content: (
                <Link href="/transaction/deposit">
                  <Button size="Small" shape="Round">
                    <EvaIcon name="upload" options={{ height: '25px', animation: { type: 'shake' } }} /> Deposit
                  </Button>
                </Link>
              ),
            },
            {
              content: (
                <Link href="/transaction/withdraw">
                  <Button size="Small" shape="Round">
                    <EvaIcon name="download" options={{ height: '25px', animation: { type: 'shake' } }} /> Withdraw
                  </Button>
                </Link>
              ),
            },
            {
              content: (
                <Link href="/transaction/adjustment">
                  <Button size="Small" shape="Round">
                    <EvaIcon name="repeat" options={{ height: '25px', animation: { type: 'shake' } }} /> Adjustment
                  </Button>
                </Link>
              ),
            },
          ]}
        />
        <Actions
          size="Small"
          className="right"
          actions={[
            {
              content: (
                <ContextMenu
                  nextJs
                  style={{ cursor: 'pointer' }}
                  placement="bottom"
                  currentPath={router.pathname}
                  items={[
                    { title: 'English', link: { href: '/dashboard' } },
                    { title: 'Indonesia', link: { href: '/dashboard' } },
                  ]}
                  Link={Link}
                >
                  <Button size="Small" shape="Round">
                    <EvaIcon name="globe-2" options={{ animation: { type: 'shake' } }} />
                  </Button>
                </ContextMenu>
              ),
            },
            {
              content: (
                <SelectStyled
                  instanceId="react-select-input"
                  isSearchable={false}
                  shape="SemiRound"
                  placeholder="Themes"
                  value={themeOptions().find((item) => item.value === props.theme.value)}
                  options={themeOptions()}
                  onChange={({ value }: { value: DefaultTheme['name'] }) => props.theme.set(value)}
                />
              ),
            },
            {
              content: <div>{isLogout}</div>,
            },
          ]}
        />
      </HeaderStyle>
    </LayoutHeader>
  );
};
export default Header;
