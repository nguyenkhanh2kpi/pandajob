import { DeleteIcon, SearchIcon, SmallAddIcon } from '@chakra-ui/icons'
import { Alert, AlertIcon, Box, Button, Card, CardBody, HStack, IconButton, Input, InputGroup, InputLeftElement, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import ColorPicker from '../../Components-admin/ColorPicker'

export const ManageLabel = () => {
  const handleColorChange = (color) => {
    console.log('Selected color:', color.hex)
  }
  return (
    <Box w={'100%'}>
      <HStack justifyContent={'space-between'} w={'100%'}>
        <InputGroup w={300}>
          <InputLeftElement pointerEvents='none'>
            <SearchIcon color='gray.300' />
          </InputLeftElement>
          <Input type='text' placeholder='Tìm ứng viên' />
        </InputGroup>
        <Button color={'white'} bgColor={'#2CCCC7'}>
          + Thêm nhãn
        </Button>
      </HStack>

      <VStack mt={5} w={'100%'}>
        <Box bgColor={'#FEEBC8'} w={'100%'} as='blockquote' borderRadius={3} borderLeft='4px solid' borderColor='blue.400' pl={4} py={2} mb={4}>
          Bạn có thể tự tạo các nhãn gián cho riêng mình và gán cho từng cv khi sàng lọc
        </Box>
        <VStack w={'100%'} justifyContent={'flex-start'}>
          
          <Card w={'50%'} alignSelf={'flex-start'}>
            <CardBody>
              <HStack justifyContent={'space-between'}>
                <Text w={'50%'}>Ứng viên phù hợp</Text>
                <ColorPicker initialColor='#00f' onChangeComplete={handleColorChange} />
                <HStack>
                  <IconButton color={'green'} aria-label='+' icon={<SmallAddIcon />} />
                  <IconButton color={'red'} aria-label='-' icon={<DeleteIcon />} />
                </HStack>
              </HStack>
            </CardBody>
          </Card>

          <Card w={'50%'} alignSelf={'flex-start'}>
            <CardBody>
              <HStack justifyContent={'space-between'}>
                <Text w={'50%'}>Ứng viên</Text>
                <ColorPicker initialColor='#00f' onChangeComplete={handleColorChange} />
                <HStack>
                  <IconButton color={'green'} aria-label='+' icon={<SmallAddIcon />} />
                  <IconButton color={'red'} aria-label='-' icon={<DeleteIcon />} />
                </HStack>
              </HStack>
            </CardBody>
          </Card>

        </VStack>
      </VStack>
    </Box>
  )
}
