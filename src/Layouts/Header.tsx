import React from 'react';
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
                <Button size="Small" shape="Round">
                  <EvaIcon name="person-add" options={{ height: '25px', animation: { type: 'shake' } }} /> New Member
                </Button>
              ),
            },
            {
              content: (
                <Button size="Small" shape="Round">
                  <EvaIcon name="upload" options={{ height: '25px', animation: { type: 'shake' } }} /> Deposit
                </Button>
              ),
            },
            {
              content: (
                <Button size="Small" shape="Round">
                  <EvaIcon name="download" options={{ height: '25px', animation: { type: 'shake' } }} /> Withdraw
                </Button>
              ),
            },
            {
              content: (
                <Button size="Small" shape="Round">
                  <EvaIcon name="repeat" options={{ height: '25px', animation: { type: 'shake' } }} /> Adjustment
                </Button>
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
            // {
            //   content: (
            //     <a href="https://slack.com" target="_blank" rel="noreferrer">
            //       <img height="20" src="/slack.svg" alt="slack" />
            //     </a>
            //   ),
            // },
            // {
            //   icon: 'twitter',
            //   url: { href: 'https://twitter.com/', target: '_blank' },
            // },
            {
              content: (
                <ContextMenu
                  nextJs
                  style={{ cursor: 'pointer' }}
                  placement="bottom"
                  currentPath={router.pathname}
                  items={[
                    { title: 'Profile', link: { href: '/dashboard' } },
                    { title: 'Log out', link: { href: '/login' } },
                  ]}
                  Link={Link}
                >
                  <User image="url('/icons/icon-72x72.png')" name="John Doe" title="User" size="Medium" />
                </ContextMenu>
              ),
            },
          ]}
        />
      </HeaderStyle>
    </LayoutHeader>
  );
};
export default Header;
