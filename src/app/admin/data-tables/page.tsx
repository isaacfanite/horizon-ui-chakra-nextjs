'use client';
import { Box } from '@chakra-ui/react';
import ComplexTable from 'views/admin/dataTables/components/ComplexTable';
import tableDataComplex from 'views/admin/dataTables/variables/tableDataComplex';
import React from 'react';

export default function DataTables() {
  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
        <ComplexTable tableData={tableDataComplex} />
    </Box>
  );
}
