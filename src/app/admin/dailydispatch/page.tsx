'use client';
import { Box } from '@chakra-ui/react';
import DailyDispatch from 'views/admin/dailyDispatch/components/dailyDispatch';
import withAuth from '../../../components/withAuth';
import React from 'react';

function DailyDisp() {
  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      <DailyDispatch />
    </Box>
  );
}

export default withAuth(DailyDisp);
