// src/routes.tsx
import React from 'react';
import { Icon } from '@chakra-ui/react';
import {
  MdBarChart,
  MdList,
  MdShoppingBasket,
  MdShelves,
} from 'react-icons/md';
import { useAuth } from './contexts/AuthContext';
import { IRoute } from 'types/navigation';

const allRoutes: IRoute[] = [
  {
    name: 'Main Dashboard',
    layout: '/admin',
    path: '/admin/default',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
  },
  {
    name: 'Product Master List',
    layout: '/admin',
    icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
    path: '/prod-mstr-lst',
  },
  {
    name: 'Daily Dispatch',
    layout: '/admin',
    icon: <Icon as={MdShoppingBasket} width="20px" height="20px" color="inherit" />,
    path: '/dailydispatch',
  },
  {
    name: 'Daily Production',
    layout: '/admin',
    icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
    path: '/dailyproduction',
  },
  {
    name: 'Store',
    layout: '/admin',
    icon: <Icon as={MdShoppingBasket} width="20px" height="20px" color="inherit" />,
    path: '/store',
  },
  {
    name: 'Stock',
    layout: '/admin',
    icon: <Icon as={MdShelves} width="20px" height="20px" color="inherit" />,
    path: '/stock',
  },
  {
    name: 'users',
    layout: '/admin',
    icon: <Icon as={MdVerifiedUser} width="20px" height="20px" color="inherit" />,
    path: '/users',
  },
];

const filteredRoutes = (role: string): IRoute[] => {
  if (role === 'Admin') {
    return allRoutes;
  } else {
    return allRoutes.filter(route =>
      route.name === 'Daily Dispatch' || route.name === 'Daily Production'
    );
  }
};

const Routes = () => {
  const { user } = useAuth();
  const routes = user ? filteredRoutes(user.role) : [];

  return (
    <>{/* Your component rendering logic here using the routes variable */}</>
  );
};

export default Routes;
