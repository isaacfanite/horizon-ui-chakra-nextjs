import React, { useState } from 'react';
import {
	Icon,
	Flex,
	Text,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	useDisclosure,
	useColorModeValue,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button
} from '@chakra-ui/react';
import {
	MdOutlineMoreHoriz,
	MdOutlineDownload,
	MdOutlinePlusOne,
	MdOutlineImportContacts
} from 'react-icons/md';
import ImportBulk from './BulkUpdate1';

interface BannerProps {
	// Define any specific props here if needed
}

const Banner: React.FC<BannerProps> = (props) => {
	const { ...rest } = props;

	const [modalType, setModalType] = useState<string | null>(null);
	const { isOpen, onOpen, onClose } = useDisclosure();

	const handleDropdownItemClick = (type: string) => {
		setModalType(type);
		onOpen();
	};

	const renderModalContent = () => {
		switch (modalType) {
			case 'addNew':
				return (
					<Flex direction='column' align='center' justify='center' p='4'>
						<Text fontSize='lg' mb='4'>Add New Content</Text>
						{/* Add more content here as needed */}
					</Flex>
				);
			case 'importBulk':
				return (
					<ImportBulk />
				);
			case 'exportCSV':
				return (
					<Flex direction='column' align='center' justify='center' p='4'>
						<Text fontSize='lg' mb='4'>Export CSV Content</Text>
						{/* Add more content here as needed */}
					</Flex>
				);
			default:
				return null;  
		}
	};

	const textColor = useColorModeValue('secondaryGray.500', 'white');
	const textHover = useColorModeValue(
		{ color: 'secondaryGray.900', bg: 'unset' },
		{ color: 'secondaryGray.500', bg: 'unset' }
	);
	const iconColor = useColorModeValue('brand.500', 'white');
	const bgList = useColorModeValue('white', 'whiteAlpha.100');
	const bgShadow = useColorModeValue('14px 17px 40px 4px rgba(112, 144, 176, 0.08)', 'unset');
	const bgButton = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');
	const bgHover = useColorModeValue({ bg: 'secondaryGray.400' }, { bg: 'whiteAlpha.50' });
	const bgFocus = useColorModeValue({ bg: 'secondaryGray.300' }, { bg: 'whiteAlpha.100' });

	return (
		<>
			<Menu>
				<MenuButton
					alignItems='center'
					justifyContent='center'
					bg={bgButton}
					_hover={bgHover}
					_focus={bgFocus}
					_active={bgFocus}
					w='37px'
					h='37px'
					lineHeight='100%'
					borderRadius='10px'
					{...rest}
				>
					<Icon as={MdOutlineMoreHoriz} color={iconColor} w='24px' h='24px' />
				</MenuButton>
				<MenuList
					w='150px'
					minW='unset'
					maxW='150px !important'
					border='transparent'
					backdropFilter='blur(63px)'
					bg={bgList}
					boxShadow={bgShadow}
					borderRadius='20px'
					p='15px'
				>
					<MenuItem
					transition='0.2s linear'
					color={textColor}
					_hover={textHover}
					p='0px'
					borderRadius='8px'
					_active={{
						bg: 'transparent'
					}}
					_focus={{
						bg: 'transparent'
					}}
					mb='10px'
					onClick={() => handleDropdownItemClick('addNew')}
					>
					<Flex align='center'>
						<Icon as={MdOutlinePlusOne} h='16px' w='16px' me='8px' />
						<Text fontSize='sm' fontWeight='400'>
							Add New
						</Text>
					</Flex>
				</MenuItem>
				<MenuItem
					transition='0.2s linear'
					p='0px'
					borderRadius='8px'
					color={textColor}
					_hover={textHover}
					_active={{
						bg: 'transparent'
					}}
					_focus={{
						bg: 'transparent'
					}}
					mb='10px'
					onClick={() => handleDropdownItemClick('importBulk')}
					>
					<Flex align='center'>
						<Icon as={MdOutlineImportContacts} h='16px' w='16px' me='8px' />
						<Text fontSize='sm' fontWeight='400'>
							Import Bulk
						</Text>
					</Flex>
				</MenuItem>
					<MenuItem
						transition='0.2s linear'
						color={textColor}
						_hover={textHover}
						p='0px'
						borderRadius='8px'
						_active={{ bg: 'transparent' }}
						_focus={{ bg: 'transparent' }}
						mb='10px'
						onClick={() => handleDropdownItemClick('exportCSV')}
					>
						<Flex align='center'>
							<Icon as={MdOutlineDownload} h='16px' w='16px' me='8px' />
							<Text fontSize='sm' fontWeight='400'>Export CSV</Text>
						</Flex>
					</MenuItem>
				</MenuList>
			</Menu>

			{/* Modal Component */}
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent bgColor={'transparent'}
          height="50%">
						{renderModalContent()}
				</ModalContent>
			</Modal>
		</>
	);
};

export default Banner;
