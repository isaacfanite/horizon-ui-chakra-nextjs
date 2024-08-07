import { Icon } from '@chakra-ui/react';
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
  MdOutlineShoppingCart,
  MdList,
  MdShoppingBasket,
  MdPlusOne,
  MdVerifiedUser,
  MdStorage,
  MdStore,
  MdSdStorage,
  MdShelves,
} from 'react-icons/md';

// Admin Imports
// import MainDashboard from './pages/admin/default';
// import NFTMarketplace from './pages/admin/nft-marketplace';
// import Profile from './pages/admin/profile';
// import DataTables from './pages/admin/data-tables';
// import RTL from './pages/rtl/rtl-default';

// Auth Imports
// import SignInCentered from './pages/auth/sign-in';
import { IRoute } from 'types/navigation';

const routes: IRoute[] = [
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

export default routes;
