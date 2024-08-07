// Chakra imports
import { Box, Button, Flex, Icon, Text, useColorModeValue } from '@chakra-ui/react';
// Custom components
import Card from 'components/card/Card';
// Assets
import { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Stack,
  Input,
} from '@chakra-ui/react';

export default function Upload(props: { used?: number; total?: number; [x: string]: any }) {
  const { used, total, ...rest } = props;
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  const brandColor = useColorModeValue('brand.500', 'white');
  const textColorSecondary = 'gray.400';

  const [formData, setFormData] = useState({
	artno: '',
	barcode: '',
	product_name: '',
	category: '',
	package_size: '',
	product_group: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('| https://lm.fanitehub.com/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('Product uploaded successfully');
		window.location.reload();
      } else {
        alert('Failed to Create New Products');
      }
    } catch (error) {
      alert('An error occurred');
    }
  };

  return (
    <Box bg="gray.900" minH="100vh" p={4}>
      <Box bg="gray.900" p={8} borderRadius="md" boxShadow="md">
        <h1>ART NO</h1>
        <Input
          name='artno'
          placeholder='Art No'
          color='gray.400'
          value={formData.artno}
          onChange={handleChange}
        />
        <h1>Barcode</h1>
        <Input
          name='barcode'
          placeholder='Barcode'
          color='gray.400'
          value={formData.barcode}
          onChange={handleChange}
        />
        <h1>Product Name</h1>
        <Input
          name='product_name'
          placeholder='Product Name'
          color='gray.400'
          value={formData.product_name}
          onChange={handleChange}
        />
		<h1>Category</h1>
        <Input
          name='category'
          placeholder='Category'
          color='gray.400'
          value={formData.category}
          onChange={handleChange}
        />
		<h1>Package Size</h1>
        <Input
          name='package_size'
          placeholder='Package Size'
          color='gray.400'
          value={formData.package_size}
          onChange={handleChange}
        />
		<h1>Product Group</h1>
        <Input
          name='product_group'
          placeholder='Product Group'
          color='gray.400'
          value={formData.product_group}
          onChange={handleChange}
        />
        
        <Button colorScheme='blue' onClick={handleSubmit} mt={4}>
          Submit
        </Button>
      </Box>
    </Box>
  );
}
