import { MenuItemType } from '@paljs/ui/types';

const items: MenuItemType[] = [
  {
    title: 'Dashboard',
    icon: { name: 'home' },
    link: { href: '/dashboard' },
  },
  {
    title: 'Transaction',
    icon: { name: 'browser-outline' },
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
    icon: { name: 'browser-outline' },
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
    icon: { name: 'browser-outline' },
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
    icon: { name: 'browser-outline' },
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
    icon: { name: 'browser-outline' },
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
    icon: { name: 'browser-outline' },
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
    icon: { name: 'browser-outline' },
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
    icon: { name: 'browser-outline' },
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
    title: '----------',
    group: true,
  },
  {
    title: 'Extra Components',
    icon: { name: 'star-outline' },
    children: [
      {
        title: 'Accordion',
        link: { href: '/extra-components/accordion' },
      },
      {
        title: 'Actions',
        link: { href: '/extra-components/actions' },
      },
      {
        title: 'Alert',
        link: { href: '/extra-components/alert' },
      },
      {
        title: 'List',
        link: { href: '/extra-components/list' },
      },
      {
        title: 'Spinner',
        link: { href: '/extra-components/spinner' },
      },
      {
        title: 'Progress Bar',
        link: { href: '/extra-components/progress' },
      },
      {
        title: 'Tabs',
        link: { href: '/extra-components/tabs' },
      },
      {
        title: 'Chat',
        link: { href: '/extra-components/chat' },
      },
      {
        title: 'Cards',
        link: { href: '/extra-components/cards' },
      },
      {
        title: 'Flip Card',
        link: { href: '/extra-components/flip-card' },
      },
      {
        title: 'Reveal Card',
        link: { href: '/extra-components/reveal-card' },
      },
    ],
  },
  {
    title: 'Forms',
    icon: { name: 'edit-2-outline' },
    children: [
      {
        title: 'Inputs',
        link: { href: '/forms/inputs' },
      },
      {
        title: 'Layout',
        link: { href: '/forms/form-layout' },
      },
      {
        title: 'Buttons',
        link: { href: '/forms/buttons' },
      },
      {
        title: 'Select',
        link: { href: '/forms/select' },
      },
    ],
  },
  {
    title: 'UI Features',
    icon: { name: 'keypad-outline' },
    children: [
      {
        title: 'Grid',
        link: { href: '/ui-features/grid' },
      },
      {
        title: 'Animated Searches',
        link: { href: '/ui-features/search' },
      },
    ],
  },
  {
    title: 'Modal & Overlays',
    icon: { name: 'browser-outline' },
    children: [
      {
        title: 'Popover',
        link: { href: '/modal-overlays/popover' },
      },
      {
        title: 'Tooltip',
        link: { href: '/modal-overlays/tooltip' },
      },
      {
        title: 'Toastr',
        link: { href: '/modal-overlays/toastr' },
      },
    ],
  },
  {
    title: 'Editors',
    icon: { name: 'text-outline' },
    children: [
      {
        title: 'TinyMCE',
        link: { href: '/editors/tinymce' },
      },
      {
        title: 'CKEditor',
        link: { href: '/editors/ckeditor' },
      },
    ],
  },
  {
    title: 'Miscellaneous',
    icon: { name: 'shuffle-2-outline' },
    children: [
      {
        title: '404',
        link: { href: '/miscellaneous/404' },
      },
    ],
  },
  {
    title: 'Auth',
    icon: { name: 'lock-outline' },
    children: [
      {
        title: 'Login',
        link: { href: '/auth/login' },
      },
      {
        title: 'Register',
        link: { href: '/auth/register' },
      },
      {
        title: 'Request Password',
        link: { href: '/auth/request-password' },
      },
      {
        title: 'Reset Password',
        link: { href: '/auth/reset-password' },
      },
    ],
  },
];

export default items;
