'use client';
import { Box, Text } from '@chakra-ui/react';
import Stock from 'views/admin/Stock/components/Stock';
import React from 'react';

export default function DataTables() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      {user.role?.trim().toLowerCase() === 'admin' ? (
        <Stock />
      ) : (
        <Text>You are not authorized to view this page</Text>
      )}
    </Box>
  );
}
