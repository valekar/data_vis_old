import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'nb-home',
    link: '/pages/dashboard',
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
