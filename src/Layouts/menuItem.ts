import { MenuItemType } from '@paljs/ui/types';

const items: MenuItemType[] = [
  {
    title: 'Dashboard',
    icon: { name: 'home', options: { animation: { type: 'shake' }} },
    link: { href: '/dashboard' },
  },
  {
    title: 'Transaction',
    icon: { name: 'monitor-outline', options: { animation: { type: 'shake' }} },
    children: [
      {
        title: 'Instant Transaction',
        link: { href: '/transaction/instant' },
      },
      {
        title: 'Transaction Enquiry',
        link: { href: '/transaction/enquiry' },
      },
      {
        title: 'Deposit',
        link: { href: '/transaction/deposit' },
      },
      {
        title: 'Withdraw',
        link: { href: '/transaction/withdraw' },
      },
      {
        title: 'Adjustment',
        link: { href: '/transaction/adjustment' },
      },
    ],
  },
  {
    title: 'Members',
    icon: { name: 'person-outline', options: { animation: { type: 'shake' }} },
    children: [
      {
        title: 'New Member',
        link: { href: '/member/new' },
      },
      {
        title: 'Member List',
        link: { href: '/member/list' },
      },
      {
        title: 'Member Tags',
        link: { href: '/member/tags' },
      },
      {
        title: 'Member Referral Report',
        link: { href: '/member/referral-report' },
      },
      {
        title: 'Member Referral Report (All)',
        link: { href: '/member/referral-report-all' },
      },
      {
        title: 'Agent Member Turnover Report',
        link: { href: '/member/agent-turnover-report' },
      },
    ],
  },
  {
    title: 'Bank',
    icon: { name: 'shield-outline', options: { animation: { type: 'shake' }} },
    children: [
      {
        title: 'Bank Summary',
        link: { href: '/bank/summary' },
      },
      {
        title: 'Banking',
        link: { href: '/bank/banking' },
      },
      {
        title: 'Account List',
        link: { href: '/bank/account-list' },
      },
    ],
  },
  {
    title: 'Agents / Affiliate',
    icon: { name: 'people-outline', options: { animation: { type: 'shake' }} },
    children: [
      {
        title: 'New Agent',
        link: { href: '/agent/new' },
      },
      {
        title: 'Agent List',
        link: { href: '/agent/list' },
      },
      {
        title: 'Agent Report',
        link: { href: '/agent/report' },
      },
      {
        title: 'Agent Detail Report',
        link: { href: '/agent/detail-report' },
      },
    ],
  },
  {
    title: 'Report',
    icon: { name: 'pie-chart-outline', options: { animation: { type: 'shake' }} },
    children: [
      {
        title: 'Outstanding Wager',
        link: { href: '/report/outstanding-wager' },
      },
      {
        title: 'Bet Enquiries [All]',
        link: { href: '/report/bet-all' },
      },
      {
        title: 'Bet Enquiries [Slot]',
        link: { href: '/report/bet-slot' },
      },
      {
        title: 'Bet Enquiries [Sports]',
        link: { href: '/report/bet-sports' },
      },
      {
        title: 'Bet Enquiries [Live Casino]',
        link: { href: '/report/bet-live-casino' },
      },
      {
        title: 'Bet Enquiries [Fishing]',
        link: { href: '/report/bet-fishing' },
      },
      {
        title: 'Bet Enquiries [Poker]',
        link: { href: '/report/bet-poker' },
      },
      {
        title: 'Daily Summary',
        link: { href: '/report/daily-summary' },
      },
      {
        title: 'Profit & Loss',
        link: { href: '/report/profit-loss' },
      },
      {
        title: 'Member Report',
        link: { href: '/report/member' },
      },
    ],
  },
  {
    title: 'Bonus & Rebate',
    icon: { name: 'shopping-bag-outline', options: { animation: { type: 'shake' }} },
    children: [
      {
        title: 'Bonus List',
        link: { href: '/bonus/list' },
      },
      {
        title: 'Rebate List',
        link: { href: '/bonus/rebate-list' },
      },
      {
        title: 'Cashback',
        link: { href: '/bonus/cashback' },
      },
      {
        title: 'Auto Rebate List',
        link: { href: '/bonus/auto-rebate-list' },
      },
    ],
  },
  {
    title: 'Tools',
    icon: { name: 'external-link-outline', options: { animation: { type: 'shake' }} },
    children: [
      {
        title: 'Product Maintenance',
        link: { href: '/tools/product-maintenance' },
      },
      {
        title: 'Game Management',
        link: { href: '/tools/game-management' },
      },
      {
        title: 'Provider Management',
        link: { href: '/tools/provider-management' },
      },
      {
        title: 'Content Management',
        link: { href: '/tools/content-management' },
      },
      {
        title: 'Banner Management',
        link: { href: '/tools/banner-management' },
      },
      {
        title: 'API Robot',
        link: { href: '/tools/api-robot' },
      },
      {
        title: 'IP Look Up',
        link: { href: '/tools/ip-lookup' },
      },
      {
        title: 'Live Tracker',
        link: { href: '/tools/live-tracker' },
      },
    ],
  },
  {
    title: 'Settings',
    icon: { name: 'settings-2-outline', options: { animation: { type: 'shake' }} },
    children: [
      {
        title: 'Announcement',
        link: { href: '/settings/announcement' },
      },
      {
        title: 'Daily Withdrawal Limit',
        link: { href: '/settings/daily-withdrawal-limit' },
      },
      {
        title: 'SMS',
        link: { href: '/settings/sms' },
      },
      {
        title: 'Email',
        link: { href: '/settings/email' },
      },
      {
        title: 'Reject Reason',
        link: { href: '/settings/reject-reason' },
      },
      {
        title: 'Remarks',
        link: { href: '/settings/remarks' },
      },
      {
        title: 'IP Access',
        link: { href: '/settings/ip-access' },
      },
      {
        title: 'Payment Gateway',
        link: { href: '/settings/payment-gateway' },
      },
    ],
  },
  {
    title: 'Admins',
    icon: { name: 'person-done-outline', options: { animation: { type: 'shake' }} },
    children: [
      {
        title: 'Bonus List',
        link: { href: '/admins/acoount' },
      },
      {
        title: 'Rebate List',
        link: { href: '/admins/departments' },
      },
      {
        title: 'Cashback',
        link: { href: '/admins/log' },
      },
      {
        title: 'Auto Rebate List',
        link: { href: '/admins/change-password' },
      },
    ],
  },
  {
    title: 'Archive',
    icon: { name: 'trending-up-outline', options: { animation: { type: 'shake' }} },
    children: [
      {
        title: 'Bet Enquiries [All]',
        link: { href: '/archive/bet-all' },
      },
      {
        title: 'Bet Enquiries [Slot]',
        link: { href: '/archive/bet-slot' },
      },
      {
        title: 'Bet Enquiries [Sports]',
        link: { href: '/archive/bet-sports' },
      },
      {
        title: 'Bet Enquiries [Live Casino]',
        link: { href: '/archive/bet-live-casino' },
      },
      {
        title: 'Profit & Loss',
        link: { href: '/archive/profit-loss' },
      },
    ],
  },
  {
    title: 'Super Admin',
    icon: { name: 'person', options: { animation: { type: 'shake' }} },
    children: [
      {
        title: 'Permissions',
        link: { href: '/super-admin/permissions' },
      },
      {
        title: 'Product Category',
        link: { href: '/super-admin/product-category' },
      },
      {
        title: 'Product',
        link: { href: '/super-admin/product' },
      },
      {
        title: 'Languages',
        link: { href: '/super-admin/languages' },
      },
      {
        title: 'Real Bet Odds Limit',
        link: { href: '/super-admin/odds-limit' },
      },
    ],
  },
  {
    title: 'Login',
    icon: { name: 'person', options: { animation: { type: 'shake' }} },
    link: { href: '/login' },
  },
  {
    title: 'Register',
    icon: { name: 'person', options: { animation: { type: 'shake' }} },
    link: { href: '/register' },
  }
];

export default items;
