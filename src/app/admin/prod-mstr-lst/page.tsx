'use client';
import { Box } from '@chakra-ui/react';
import ProductMasterList from 'views/admin/productMasterList/components/ProductMasterList';
import React from 'react';

export default function DataTables() {
  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
        <ProductMasterList />
    </Box>
  );
}
