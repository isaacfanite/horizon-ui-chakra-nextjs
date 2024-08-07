import React from 'react';
import {
  Box, Flex, Text, Table, Tbody, Td, Th, Thead, Tr,
  useColorModeValue, Input, Button, Stack
} from '@chakra-ui/react';
import {
  createColumnHelper, flexRender, getCoreRowModel,
  getPaginationRowModel, getSortedRowModel, SortingState,
  useReactTable, PaginationState
} from '@tanstack/react-table';
import { format } from 'date-fns';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import Card from 'components/card/Card';
import Menu from 'components/menu/productMenu';
import EditModal from './EditModal';

type RowObj = {
  artno: string;
  product_name: string;
  category: string;
  package_size: string;
  unit: string;
  finished_pdt: string;
  demand: string;
  origin: string;
  quantity: string;
  usage_qty: string;
  cost: string;
  stock_value: string;
  updatedAt: string;
};

const columnHelper = createColumnHelper<RowObj>();

export default function ComplexTable() {
  const [tableData, setTableData] = React.useState<RowObj[]>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pagination, setPagination] = React.useState<PaginationState>({ pageIndex: 0, pageSize: 10 });
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filteredData, setFilteredData] = React.useState<RowObj[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [currentRowData, setCurrentRowData] = React.useState<RowObj | null>(null);
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');

  React.useEffect(() => {
    fetch('| https://lm.fanitehub.com/store')
      .then(response => response.json())
      .then(data => setTableData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  React.useEffect(() => {
    const filtered = tableData.filter(item =>
      Object.values(item).some(value =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredData(filtered);
  }, [searchTerm, tableData]);

  const handleRowClick = (row: RowObj) => {
    setCurrentRowData(row);
    setIsEditModalOpen(true);
  };

  const handleSave = (updatedData: RowObj) => {
    setTableData(prevData =>
      prevData.map(item => (item.artno === updatedData.artno ? updatedData : item))
    );
  };

  const formatDate = (dateStr: string) => {
    return format(new Date(dateStr), 'MMM dd, yyyy'); // Change the format as needed
  };

  const exportToExcel = async () => {
    const formatDate = (date) => {
      const d = new Date(date);
      return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
    };

    const formattedData = filteredData.map(data => ({
      ...data,
      updatedAt: formatDate(data.updatedAt)
    }));

    const headerRow = [
      'Product Items', 'Category', 'Pack Size', 'Unit', 'Finished PDT',
      'Demand', 'Origin', 'Quantity', 'Usage Qty', 'Cost', 'Stock Value', 'Updated At'
    ];

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet1');

    const imgUrl = 'https://res.cloudinary.com/dw90vkmoc/image/upload/v1722858399/WhatsApp_Image_2024-08-05_at_14.36.09_272c8318_z85oe6.jpg'; // Update this path to your image
    const response = await fetch(imgUrl);
    const imgBuffer = await response.arrayBuffer(); // Renamed to imgBuffer
    const imageId = workbook.addImage({
      buffer: Buffer.from(imgBuffer),
      extension: 'jpeg',
    });

    worksheet.addImage(imageId, {
      tl: { col: 0, row: 0 },
      br: { col: 12, row: 4 }
    });

    worksheet.addRow(headerRow);

    formattedData.forEach(data => {
      worksheet.addRow([
        data.product_items, data.category, data.pack_size, data.unit, data.finished_pdt,
        data.demand, data.origin, data.quantity, data.usage_qty, data.cost, data.stock_value, data.updatedAt
      ]);
    });

    const today = new Date();
    const dateStr = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    const fileName = `STOCK UPDATE ${dateStr}.xlsx`;

    const workbookBuffer = await workbook.xlsx.writeBuffer(); // Renamed to workbookBuffer
    const blob = new Blob([workbookBuffer], { type: 'application/octet-stream' });
    saveAs(blob, fileName);
  };

  const columns = [
    columnHelper.accessor('product_items', {
      id: 'product_items',
      header: () => (
        <Text
          justifyContent='space-between'
          align='center'
          fontSize={{ sm: '8px', lg: '12px' }}
          color='gray.400'>
          PRODUCT ITEMS
        </Text>
      ),
      cell: (info: any) => (
        <Flex align='center'>
          <Text color={textColor} fontSize='sm' fontWeight='400'>
            {info.getValue()}
          </Text>
        </Flex>
      )
    }),
    columnHelper.accessor('category', {
      id: 'category',
      header: () => (
        <Text
          justifyContent='space-between'
          align='center'
          fontSize={{ sm: '8px', lg: '12px' }}
          color='gray.400'>
          CATEGORY
        </Text>
      ),
      cell: (info) => (
        <Flex align='center'>
          <Text color={textColor} fontSize='sm' fontWeight='400'>
            {info.getValue()}
          </Text>
        </Flex>
      )
    }),
    columnHelper.accessor('pack_size', {
      id: 'pack_size',
      header: () => (
        <Text
          justifyContent='space-between'
          align='center'
          fontSize={{ sm: '8px', lg: '12px' }}
          color='gray.400'>
          PACK SIZE
        </Text>
      ),
      cell: (info) => (
        <Text color={textColor} fontSize='sm' fontWeight='400'>
          {info.getValue()}
        </Text>
      )
    }),
    columnHelper.accessor('unit', {
      id: 'unit',
      header: () => (
        <Text
          justifyContent='space-between'
          align='center'
          fontSize={{ sm: '8px', lg: '12px' }}
          color='gray.400'>
          UNIT
        </Text>
      ),
      cell: (info) => (
        <Text color={textColor} fontSize='sm' fontWeight='400'>
          {info.getValue()}
        </Text>
      )
    }),
    columnHelper.accessor('finished_pdt', {
      id: 'finished_pdt',
      header: () => (
        <Text
          justifyContent='space-between'
          align='center'
          fontSize={{ sm: '8px', lg: '12px' }}
          color='gray.400'>
          FINISHED PDT
        </Text>
      ),
      cell: (info) => (
        <Text color={textColor} fontSize='sm' fontWeight='400'>
          {info.getValue()}
        </Text>
      )
    }),
    columnHelper.accessor('demand', {
      id: 'demand',
      header: () => (
        <Text
          justifyContent='space-between'
          align='center'
          fontSize={{ sm: '8px', lg: '12px' }}
          color='gray.400'>
          DEMAND
        </Text>
      ),
      cell: (info) => (
        <Text color={textColor} fontSize='sm' fontWeight='400'>
          {info.getValue()}
        </Text>
      )
    }),
    columnHelper.accessor('origin', {
      id: 'origin',
      header: () => (
        <Text
          justifyContent='space-between'
          align='center'
          fontSize={{ sm: '8px', lg: '12px' }}
          color='gray.400'>
          ORIGIN
        </Text>
      ),
      cell: (info) => (
        <Text color={textColor} fontSize='sm' fontWeight='400'>
          {info.getValue()}
        </Text>
      )
    }),
    columnHelper.accessor('quantity', {
      id: 'quantity',
      header: () => (
        <Text
          justifyContent='space-between'
          align='center'
          fontSize={{ sm: '8px', lg: '12px' }}
          color='gray.400'>
          QUANTITY
        </Text>
      ),
      cell: (info) => (
        <Text color={textColor} fontSize='sm' fontWeight='400'>
          {info.getValue()}
        </Text>
      )
    }),
    columnHelper.accessor('usage_qty', {
      id: 'usage_qty',
      header: () => (
        <Text
          justifyContent='space-between'
          align='center'
          fontSize={{ sm: '8px', lg: '12px' }}
          color='gray.400'>
          USAGE QTY
        </Text>
      ),
      cell: (info) => (
        <Text color={textColor} fontSize='sm' fontWeight='400'>
          {info.getValue()}
        </Text>
      )
    }),
    columnHelper.accessor('cost', {
      id: 'cost',
      header: () => (
        <Text
          justifyContent='space-between'
          align='center'
          fontSize={{ sm: '8px', lg: '12px' }}
          color='gray.400'>
          COST
        </Text>
      ),
      cell: (info) => (
        <Text color={textColor} fontSize='sm' fontWeight='400'>
          {info.getValue()}
        </Text>
      )
    }),
    columnHelper.accessor('stock_value', {
      id: 'stock_value',
      header: () => (
        <Text
          justifyContent='space-between'
          align='center'
          fontSize={{ sm: '8px', lg: '12px' }}
          color='gray.400'>
          STOCK VALUE
        </Text>
      ),
      cell: (info) => (
        <Text color={textColor} fontSize='sm' fontWeight='400'>
          {info.getValue()}
        </Text>
      )
    }),
    columnHelper.accessor('updatedAt', {
      id: 'updatedAt',
      header: () => (
        <Text
          justifyContent='space-between'
          align='center'
          fontSize={{ sm: '8px', lg: '12px' }}
          color='gray.400'>
          UPDATED AT
        </Text>
      ),
      cell: (info) => (
        <Text color={textColor} fontSize='sm' fontWeight='400'>
          {formatDate(info.getValue())}
        </Text>
      )
    }),
    columnHelper.display({
      id: 'actions',
      cell: (props) => (
        <Menu
          row={props.row.original}
          onEdit={() => handleRowClick(props.row.original)}
        />
      )
    })
  ];

  const table = useReactTable({
    data: filteredData,
    columns,
    state: { sorting, pagination },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
  });

  return (
    <Box pt={{ base: '500px', md: '80px', xl: '80px' }}>
      <Card
        direction='column'
        w='100%'
        px='0px'
        overflowX={{ sm: 'scroll', lg: 'hidden' }}>
        <Flex
          px='25px'
          justify='space-between'
          mb='20px'
          align='center'>
          <Text
            color={textColor}
            fontSize='22px'
            fontWeight='700'
            lineHeight='100%'>
            Stock Data
          </Text>
          <Stack direction='row' spacing={4} align='center'>
            <Input
              type='text'
              placeholder='Search...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button
              colorScheme='blue'
              onClick={exportToExcel}>
              Export to Excel
            </Button>
          </Stack>
        </Flex>
        <Box overflowX='auto'>
          <Table variant='simple' color='gray.500' mb='24px'>
            <Thead>
              {table.getHeaderGroups().map(headerGroup => (
                <Tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <Th
                      key={header.id}
                      borderColor={borderColor}
                      colSpan={header.colSpan}
                      cursor='pointer'
                      onClick={header.column.getToggleSortingHandler()}>
                      <Flex
                        justifyContent='space-between'
                        align='center'
                        fontSize={{ sm: '10px', lg: '12px' }}
                        color='gray.400'>
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        <Box>
                          {{
                            asc: ' 🔼',
                            desc: ' 🔽',
                          }[header.column.getIsSorted() as string] ?? null}
                        </Box>
                      </Flex>
                    </Th>
                  ))}
                </Tr>
              ))}
            </Thead>
            <Tbody>
              {table.getRowModel().rows.map(row => (
                <Tr key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <Td
                      key={cell.id}
                      fontSize={{ sm: '14px' }}
                      borderColor='transparent'
                      onClick={() => handleRowClick(row.original)}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </Td>
                  ))}
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
        <Flex justify='space-between' align='center' px='25px' mt='20px'>
          <Button
            onClick={() => table.previousPage()}
            isDisabled={!table.getCanPreviousPage()}>
            Previous
          </Button>
          <Text>
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </Text>
          <Button
            onClick={() => table.nextPage()}
            isDisabled={!table.getCanNextPage()}>
            Next
          </Button>
        </Flex>
      </Card>
      {currentRowData && (
        <EditModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          rowData={currentRowData}
          onSave={handleSave}
        />
      )}
    </Box>
  );
}
