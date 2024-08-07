import {
  Box,
  Flex,
  Text,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Input,
  Button,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Select,
  useToast
} from '@chakra-ui/react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  PaginationState
} from '@tanstack/react-table';
import Card from 'components/card/Card';
import Menu from 'components/menu/productMenu';
import * as React from 'react';

type RowObj = {
  fullname: string;
  username: string;
  email: string;
  role: string;
  createdAt: string;
};

const columnHelper = createColumnHelper<RowObj>();

export default function ComplexTable() {
  const [tableData, setTableData] = React.useState<RowObj[]>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pagination, setPagination] = React.useState<PaginationState>({ pageIndex: 0, pageSize: 10 });
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filteredData, setFilteredData] = React.useState<RowObj[]>([]);
  const [isOpen, setIsOpen] = React.useState(false);
  const [newUser, setNewUser] = React.useState({ fullname: '', username: '', email: '', role: '', createdAt: '' });
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
  const toast = useToast();

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewUser(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleAddUser = async () => {
    try {
      const response = await fetch('| https://lm.fanitehub.com/create/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...newUser, createdAt: new Date().toISOString() })
      });
      if (response.ok) {
        const createdUser = await response.json();
        setTableData(prevData => [...prevData, createdUser]);
        window.location.reload();
        setIsOpen(false);
        toast({
          title: "User created.",
          description: "New user has been added successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        console.error('Failed to create user');
      }
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  React.useEffect(() => {
    fetch('| https://lm.fanitehub.com/users')
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

  const columns = [
    columnHelper.accessor('fullname', {
      id: 'fullname',
      header: () => (
        <Text justifyContent='space-between' align='center' fontSize={{ sm: '10px', lg: '12px' }} color='gray.400'>
          FULL NAMES
        </Text>
      ),
      cell: (info: any) => (
        <Flex align='center'>
          <Text color={textColor} fontSize='sm' fontWeight='700'>
            {info.getValue()}
          </Text>
        </Flex>
      )
    }),
    columnHelper.accessor('username', {
      id: 'username',
      header: () => (
        <Text justifyContent='space-between' align='center' fontSize={{ sm: '10px', lg: '12px' }} color='gray.400'>
          USERNAME
        </Text>
      ),
      cell: (info: any) => (
        <Flex align='center'>
          <Text color={textColor} fontSize='sm' fontWeight='700'>
            {info.getValue()}
          </Text>
        </Flex>
      )
    }),
    columnHelper.accessor('email', {
      id: 'email',
      header: () => (
        <Text justifyContent='space-between' align='center' fontSize={{ sm: '10px', lg: '12px' }} color='gray.400'>
          EMAIL
        </Text>
      ),
      cell: (info: any) => (
        <Flex align='center'>
          <Text color={textColor} fontSize='sm' fontWeight='700'>
            {info.getValue()}
          </Text>
        </Flex>
      )
    }),
    columnHelper.accessor('role', {
      id: 'role',
      header: () => (
        <Text justifyContent='space-between' align='center' fontSize={{ sm: '10px', lg: '12px' }} color='gray.400'>
          ROLE
        </Text>
      ),
      cell: (info: any) => (
        <Flex align='center'>
          <Text color={textColor} fontSize='sm' fontWeight='700'>
            {info.getValue()}
          </Text>
        </Flex>
      )
    })
  ];

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      sorting,
      pagination
    },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true
  });

  return (
    <Card flexDirection='column' w='100%' px='0px' overflowX={{ sm: 'scroll', lg: 'hidden' }}>
      <Flex px='25px' mb="8px" justifyContent='space-between' align='center'>
        <Menu />
        <Button colorScheme='blue' onClick={handleOpen}>Add User</Button>
      </Flex>
      <Box px='25px' mb='20px'>
        <Stack spacing={4}>
          <Input
            placeholder='Search...'
            value={searchTerm}
            color={textColor}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Stack>
      </Box>
      <Box>
        <Table variant='simple' color='gray.500' mb='24px' mt="12px">
          <Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Th
                    key={header.id}
                    colSpan={header.colSpan}
                    pe='10px'
                    borderColor={borderColor}
                    cursor='pointer'
                    onClick={header.column.getToggleSortingHandler()}>
                    <Flex
                      justifyContent='space-between'
                      align='center'
                      fontSize={{ sm: '10px', lg: '12px' }}
                      color='gray.400'>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {{
                        asc: '',
                        desc: '',
                      }[header.column.getIsSorted() as string] ?? null}
                    </Flex>
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {table.getRowModel().rows.map((row) => (
              <Tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Td
                    key={cell.id}
                    fontSize={{ sm: '14px' }}
                    minW={{ sm: '150px', md: '200px', lg: 'auto' }}
                    borderColor='transparent'>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Flex justifyContent='space-between' align='center' px='25px' mt='4'>
          <Text>
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </Text>
          <Flex>
            <Button
              onClick={() => table.previousPage()}
              isDisabled={!table.getCanPreviousPage()}
              mr='2'>
              Previous
            </Button>
            <Button
              onClick={() => table.nextPage()}
              isDisabled={!table.getCanNextPage()}>
              Next
            </Button>
          </Flex>
        </Flex>
      </Box>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New User</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Full Name</FormLabel>
              <Input
                type="text"
                name="fullname"
                value={newUser.fullname}
                onChange={handleInputChange}
                color="whiteAlpha.900"
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                name="username"
                value={newUser.username}
                onChange={handleInputChange}
                color="whiteAlpha.900"
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                name="email"
                value={newUser.email}
                onChange={handleInputChange}
                color="whiteAlpha.900"
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Role</FormLabel>
              <Select
                name="role"
                value={newUser.role}
                onChange={handleInputChange}
                color="whiteAlpha.900"
              >
                <option value="Admin">Admin</option>
                <option value="Agent">Agent</option>
              </Select>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' onClick={handleAddUser}>
              Add User
            </Button>
            <Button variant='ghost' onClick={handleClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Card>
  );
}
