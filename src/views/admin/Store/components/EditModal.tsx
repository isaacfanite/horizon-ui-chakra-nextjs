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
        <ModalHeader>Edit Item</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={4}>
            <Input
              name='product_items'
              placeholder='Product Items'
              value={formData?.product_items || ''}
              color='gray.400'
              onChange={handleChange}
            />
            <Input
              name='category'
              placeholder='Category'
              value={formData?.category || ''}
              color='gray.400'
              onChange={handleChange}
            />
            <Input
              name='pack_size'
              placeholder='Package Size'
              value={formData?.pack_size || ''}
              color='gray.400'
              onChange={handleChange}
            />
            <Input
              name='unit'
              placeholder='Unit'
              value={formData?.unit || ''}
              color='gray.400'
              onChange={handleChange}
            />
            <Input
              name='finished_pdt'
              placeholder='Finished PDT'
              value={formData?.finished_pdt || ''}
              color='gray.400'
              onChange={handleChange}
            />
            <Input
              name='demand'
              placeholder='Demand'
              value={formData?.demand || ''}
              color='gray.400'
              onChange={handleChange}
            />
            <Input
              name='origin'
              placeholder='Origin'
              value={formData?.origin || ''}
              color='gray.400'
              onChange={handleChange}
            />
            <Input
              name='quantity'
              placeholder='Quantity'
              value={formData?.quantity || ''}
              color='gray.400'
              onChange={handleChange}
            />
            <Input
              name='usage_qty'
              placeholder='Usage Qty'
              value={formData?.usage_qty || ''}
              color='gray.400'
              onChange={handleChange}
            />
            <Input
              name='cost'
              placeholder='Cost'
              value={formData?.cost || ''}
              color='gray.400'
              onChange={handleChange}
            />
            <Input
              name='stock_value'
              placeholder='Stock Value'
              value={formData?.stock_value || ''}
              color='gray.400'
              onChange={handleChange}
            />
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={handleSave}>
            Save
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
