import React from 'react'
import { Box, Button, FormControl, FormLabel, HStack, Input } from '@chakra-ui/react'

export const ResumeJsonSkill = ({ skill, index, onSkillChange, handleAdd, handleDelete, canDelete }) => {
  const handleOnChange = (e) => {
    const { name, value } = e.target
    onSkillChange(index, name, value)
  }

  return (
    <Box w={'100%'}>
      <HStack spacing={10} w={'100%'}>
        <FormControl w={'30%'}>
          <FormLabel>Tên</FormLabel>
          <Input name='name' placeholder='' value={skill.name} onChange={handleOnChange} />
        </FormControl>
        <FormControl w={'50%'}>
          <FormLabel>Mô tả</FormLabel>
          <Input name='description' placeholder='' value={skill.description} onChange={handleOnChange} />
        </FormControl>
        <HStack mt={8} w={'40%'}>
          {canDelete && (
            <Button onClick={() => handleDelete(index)} color={'white'} backgroundColor={'#94a6a6'}>
              -
            </Button>
          )}
          <Button onClick={handleAdd} color={'white'} backgroundColor={'#8ebfb4'} ml={2}>
            +
          </Button>
        </HStack>
      </HStack>
    </Box>
  )
}
