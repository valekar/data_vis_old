import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Team',
    icon: 'nb-home',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Match',
    icon: 'nb-bar-chart',
    link: '/pages/matches',
    home: true,
  },
  
  {
    title: 'Charts',
    icon: 'nb-bar-chart',
    children: [
      {
        title: 'D3',
        link: '/pages/charts/d3',
      },
    ],
  }
];
