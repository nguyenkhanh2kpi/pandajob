import React from 'react'
import { HStack, FormControl, FormLabel, Input, Select, Textarea, Text, Box, Button } from '@chakra-ui/react'
import { degrees } from './constrain'

export const ResumeJsonEducation = ({ education, index, onEducationChange, handleAdd, handleDelete }) => {
  const handleOnChange = (e) => {
    const { name, value } = e.target
    onEducationChange(index, name, value)
  }

  return (
    <Box w={'100%'}>
      <HStack spacing={10} w={'100%'}>
        <FormControl w={'50%'}>
          <FormLabel>Tên trường cơ sở đào tạo chính quy</FormLabel>
          <Input onChange={handleOnChange} name='school' value={education.school} />
        </FormControl>
        <FormControl w={'50%'}>
          <FormLabel>Chuyên ngành</FormLabel>
          <Input onChange={handleOnChange} name='major' value={education.major} />
        </FormControl>
      </HStack>
      <HStack spacing={10} w={'100%'}>
        <FormControl w={'50%'}>
          <FormLabel>Thời gian</FormLabel>
          <HStack>
            <Input onChange={handleOnChange} name='startEducationTime' type='date' value={education.startEducationTime} />
            <Text>Đến</Text>
            <Input onChange={handleOnChange} name='endEducationTime' type='date' value={education.endEducationTime} />
          </HStack>
        </FormControl>
        <FormControl w={'50%'}>
          <FormLabel>Loại bằng cấp</FormLabel>
          <Select onChange={handleOnChange} name='degree' value={education.degree} placeholder='Bằng cấp'>
            {degrees.map((degree) => (
              <option key={degree} value={degree}>
                {degree}
              </option>
            ))}
          </Select>
        </FormControl>
      </HStack>
      <HStack spacing={10} w={'100%'}>
        <FormControl w={'100%'}>
          <FormLabel>Hoạt động khác</FormLabel>
          <Textarea onChange={handleOnChange} name='others' value={education.others} />
        </FormControl>
      </HStack>
      <HStack w={'40%'}>
        <Button color={'white'} onClick={() => handleDelete(index)} backgroundColor={'#94a6a6'} mt={2}>
          -
        </Button>
        <Button onClick={handleAdd} color={'white'} backgroundColor={'#8ebfb4'} ml={2} mt={2}>
          +
        </Button>
      </HStack>
    </Box>
  )
}
