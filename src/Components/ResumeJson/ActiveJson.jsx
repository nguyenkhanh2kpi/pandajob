import React from 'react'
import { Box, Button, FormControl, FormLabel, HStack, Input, Textarea, Text } from '@chakra-ui/react'
// frame activate
export const ResumeJsonActivate = ({ activate, index, onActivateChange, handleAdd, handleDelete }) => {
  const handleOnChange = (e) => {
    const { name, value } = e.target
    onActivateChange(index, name, value)
  }
  return (
    <Box w={'100%'}>
      <HStack spacing={10} w={'100%'}>
        <FormControl w={'50%'}>
          <FormLabel>Thời gian bắt đầu</FormLabel>
          <Input name='start' onChange={handleOnChange} type='date' value={activate.start} />
        </FormControl>
        <FormControl w={'50%'}>
          <FormLabel>Thời gian kết thúc</FormLabel>
          <Input name='end' onChange={handleOnChange} type='date' value={activate.end} />
        </FormControl>
      </HStack>
      <HStack spacing={10} w={'100%'}>
        <FormControl w={'100%'}>
          <FormLabel>Tên tổ chức</FormLabel>
          <Input name='name_organization' onChange={handleOnChange} value={activate.name_organization} />
        </FormControl>
      </HStack>
      <HStack spacing={10} w={'100%'}>
        <FormControl w={'100%'}>
          <FormLabel>Chức vụ</FormLabel>
          <Input name='position' onChange={handleOnChange} value={activate.position} />
        </FormControl>
      </HStack>
      <HStack spacing={10} w={'100%'}>
        <FormControl w={'100%'}>
          <FormLabel>Mô tả</FormLabel>
          <Textarea name='description' onChange={handleOnChange} value={activate.description} />
        </FormControl>
      </HStack>
      <HStack w={'40%'}>
        <Button onClick={() => handleDelete(index)} color={'white'} backgroundColor={'#94a6a6'} mt={2}>
          -
        </Button>
        <Button onClick={handleAdd} color={'white'} backgroundColor={'#8ebfb4'} ml={2} mt={2}>
          +
        </Button>
      </HStack>
    </Box>
  )
}
