import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  Stack,
} from '@chakra-ui/react';
import { Label } from '@mui/icons-material';

type RowObj = {
  id: string; // Add id here
  product_items: string;
  category: string;
  pack_size: string;
  unit: string;
  finished_pdt: string;
  demand: string;
  origin: string;
  quantity: string;
  usage_qty: string;
  cost: string;
  stock_value: string;
};

type EditModalProps = {
  isOpen: boolean;
  onClose: () => void;
  data: RowObj | null;
  onSave: (updatedData: RowObj) => void;
};

const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, data, onSave }) => {
  const [formData, setFormData] = useState<RowObj | null>(data);

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (formData) {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSave = async () => {
    if (formData && formData.id) {
      try {
        const response = await fetch(`| https://lm.fanitehub.com/store/${formData.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const updatedData = await response.json();
        onSave(updatedData);
        onClose();
      } catch (error) {
        console.error('Failed to update the data:', error);
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New Product</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={4}>
			<Label>ART NO</Label>
		  <Input
              name='artno'
              placeholder='Product Items'
              color='gray.400'
            />
			<Label>Barcode</Label>
			<Input
              name='barcode'
              placeholder='Product Items'
              color='gray.400'
            />
			<Label>Product Name</Label>
			<Input
              name='product_items'
              placeholder='Product Items'
              color='gray.400'
            />
            <Input
              name='category'
              placeholder='Category'
              color='gray.400'
            />
            <Input
              name='pack_size'
              placeholder='Package Size'
              color='gray.400'
            />
            <Input
              name='unit'
              placeholder='Unit'
              color='gray.400'
            />
            <Input
              name='finished_pdt'
              placeholder='Finished PDT'
              color='gray.400'
            />
            <Input
              name='demand'
              placeholder='Demand'
              color='gray.400'
            />
            <Input
              name='origin'
              placeholder='Origin'
              color='gray.400'
            />
            <Input
              name='quantity'
              placeholder='Quantity'
              color='gray.400'
            />
            <Input
              name='usage_qty'
              placeholder='Usage Qty'
              color='gray.400'
            />
            <Input
              name='cost'
              placeholder='Cost'
              color='gray.400'
            />
            <Input
              name='stock_value'
              placeholder='Stock Value'
              color='gray.400'
            />
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={handleSave}>
            Add New
          </Button>
          <Button variant='ghost' onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditModal;
