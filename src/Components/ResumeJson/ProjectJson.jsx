import React from 'react'
import { Box, Button, FormControl, FormLabel, HStack, Input, Textarea, Text } from '@chakra-ui/react'

export const ResumeJsonProject = ({ worksProject, index, onProjectChange, handleAdd, handleDelete, canDelete }) => {
  const handleOnChange = (e) => {
    const { name, value } = e.target
    onProjectChange(index, name, value)
  }

  return (
    <Box w={'100%'}>
      <HStack spacing={10} w={'100%'}>
        <FormControl w={'50%'}>
          <FormLabel>Tên dự án</FormLabel>
          <Input name='nameProject' onChange={handleOnChange} placeholder='' value={worksProject.nameProject} />
        </FormControl>
        <HStack w={'50%'}>
          <FormControl w={'50%'}>
            <FormLabel>Vị trí - chức vụ</FormLabel>
            <Input name='position' onChange={handleOnChange} placeholder='' value={worksProject.position} />
          </FormControl>
          <FormControl w={'50%'}>
            <FormLabel>Số thành viên</FormLabel>
            <Input name='members' onChange={handleOnChange} placeholder='' value={worksProject.members} />
          </FormControl>
        </HStack>
      </HStack>
      <HStack spacing={10} w={'100%'}>
        <HStack w={'50%'}>
          <FormControl w={'100%'}>
            <FormLabel>Khách hàng</FormLabel>
            <Input name='client' onChange={handleOnChange} placeholder='' value={worksProject.client} />
          </FormControl>
        </HStack>
        <HStack w={'50%'}>
          <FormControl w={'100%'}>
            <FormLabel>Thời gian</FormLabel>
            <HStack>
              <Input name='startTime' onChange={handleOnChange} type='date' placeholder='' value={worksProject.startTime} />
              <Text>Đến</Text>
              <Input name='endTime' onChange={handleOnChange} type='date' placeholder='' value={worksProject.endTime} />
            </HStack>
          </FormControl>
        </HStack>
      </HStack>
      <HStack spacing={10} w={'100%'}>
        <FormControl w={'50%'}>
          <FormLabel>Trách nhiệm/ vai trò</FormLabel>
          <Textarea name='responsibilities' onChange={handleOnChange} placeholder='' value={worksProject.responsibilities} />
        </FormControl>
        <FormControl w={'50%'}>
          <FormLabel>Mô tả</FormLabel>
          <Textarea name='description' onChange={handleOnChange} placeholder='' value={worksProject.description} />
        </FormControl>
      </HStack>
      <HStack spacing={10} w={'100%'}>
        <FormControl w={'100%'}>
          <FormLabel>Kĩ năng, công nghệ liên quan</FormLabel>
          <Textarea name='technology' onChange={handleOnChange} placeholder='' value={worksProject.technology} />
        </FormControl>
      </HStack>

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
