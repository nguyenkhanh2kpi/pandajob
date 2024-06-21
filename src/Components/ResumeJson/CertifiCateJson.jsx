import React from 'react'
import { Box, Button, FormControl, FormLabel, HStack, Input, Textarea, Text } from '@chakra-ui/react'
// frame certificate
export const ResumeJsonCertificate = ({ certificate, index, onCertificateChange, handleAdd, handleDelete, canDelete }) => {
  const handleOnChange = (e) => {
    const { name, value } = e.target
    onCertificateChange(index, name, value)
  }

  return (
    <Box w={'100%'}>
      <HStack spacing={10} w={'100%'}>
        <FormControl w={'50%'}>
          <FormLabel>Ngày cấp</FormLabel>
          <Input name='time' onChange={handleOnChange} type='date' value={certificate.time} />
        </FormControl>
        <FormControl w={'50%'}>
          <FormLabel>Tên chứng chỉ</FormLabel>
          <Input name='name' onChange={handleOnChange} value={certificate.name} />
        </FormControl>
      </HStack>{' '}
      <HStack w={'40%'}>
        {canDelete && (
          <Button onClick={() => handleDelete(index)} color={'white'} backgroundColor={'#94a6a6'} mt={2}>
            -
          </Button>
        )}
        <Button onClick={handleAdd} color={'white'} backgroundColor={'#8ebfb4'} ml={2} mt={2}>
          +
        </Button>
      </HStack>
    </Box>
  )
}
