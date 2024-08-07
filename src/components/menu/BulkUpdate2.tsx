// Chakra imports
import { Box, Button, Flex, Icon, Text, useColorModeValue } from '@chakra-ui/react';
// Custom components
import Card from 'components/card/Card';
// Assets
import { MdUpload } from 'react-icons/md';
import { useDropzone } from 'react-dropzone';
import { useState } from 'react';
import * as XLSX from 'xlsx';
import { addDays, format } from 'date-fns';

export default function Upload(props: { used?: number; total?: number; [x: string]: any }) {
    const { used, total, ...rest } = props;
    // Chakra Color Mode
    const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
    const brandColor = useColorModeValue('brand.500', 'white');
    const textColorSecondary = 'gray.400';

    const [file, setFile] = useState(null);

    const onDrop = (acceptedFiles) => {
        setFile(acceptedFiles[0]);
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: '.xlsx,.xls' });

    const convertSerialDate = (serialDate) => {
        const excelStartDate = new Date(1900, 0, 1);
        const adjustedSerialDate = serialDate - 1; // Excel serial date is off by one day
        const date = addDays(excelStartDate, adjustedSerialDate);
        return format(date, 'yyyy-MM-dd');
    };

    const handleUpload = async () => {
        if (file) {
            const reader = new FileReader();
            reader.onload = async (event) => {
                const binaryStr = event.target.result;
                const workbook = XLSX.read(binaryStr, { type: 'binary' });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(worksheet);

                // Check for and format date columns
                const formattedData = jsonData.map(item => {
                    if (item.DATE) {
                        if (typeof item.DATE === 'number') {
                            item.DATE = convertSerialDate(item.DATE);
                        } else if (typeof item.DATE === 'string' && !isNaN(Date.parse(item.DATE))) {
                            item.DATE = format(new Date(item.DATE), 'yyyy-MM-dd');
                        }
                    }
                    return item;
                });

                // Post JSON data to the server
                try {
                    const response = await fetch('| https://lm.fanitehub.com/update-production', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(formattedData),
                    });
                    const data = await response.json();
                    console.log('Server Response:', data);
                } catch (error) {
                    console.error('Error posting JSON data:', error);
                }
            };
            reader.readAsBinaryString(file);
        } else {
            alert('Please select a file to upload.');
        }
    };

    return (
        <Card {...rest} mb='20px' alignItems='center' p='20px'>
            <Flex h='100%' direction={{ base: 'column', '2xl': 'row' }}>
                <Box {...getRootProps()} w={{ base: '100%', '2xl': '268px' }} me='36px' maxH={{ base: '60%', lg: '50%', '2xl': '100%' }} minH={{ base: '60%', lg: '50%', '2xl': '100%' }} borderWidth="1px" borderRadius="md" borderColor="gray.300" p="20px" textAlign="center" cursor="pointer">
                    <input {...getInputProps()} />
                    <Icon as={MdUpload} w='60px' h='60px' color={brandColor} />
                    <Flex justify='center' mx='auto' mb='12px'>
                        <Text fontSize='xl' fontWeight='700' color={brandColor}>
                            Import Bulk
                        </Text>
                    </Flex>
                    <Text fontSize='sm' fontWeight='500' color='secondaryGray.500'>
                        Excel files Only are allowed
                    </Text>
                    {file && (
                        <Text fontSize='sm' fontWeight='500' color='secondaryGray.500'>
                            Selected file: {file.name}
                        </Text>
                    )}
                </Box>
                <br />
                <Flex direction={{ base: 'column', '2xl': 'row' }}>
                    <Flex w='100%' justifyItems='center'>
                        <Button
                            me='100%'
                            mb='50px'
                            w='140px'
                            minW='140px'
                            mt={{ base: '20px', '2xl': 'auto' }}
                            variant='brand'
                            fontWeight='500'
                            onClick={handleUpload}>
                            Upload
                        </Button>
                    </Flex>
                </Flex>
            </Flex>
        </Card>
    );
}
