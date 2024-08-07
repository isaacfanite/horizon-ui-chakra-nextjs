'use client';
import { Box } from '@chakra-ui/react';
import DailyProduction from 'views/admin/dailyProduction/components/DailyProduction';
import withAuth from '../../../components/withAuth';
import React from 'react';

function DailyProd() {
  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      <DailyProduction />
    </Box>
  );
}

export default withAuth(DailyProd);
