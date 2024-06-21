import { Box, Button, FormControl, FormLabel, HStack, Input, Text, Textarea } from '@chakra-ui/react'

// kinh nghiem lam viec
export const ResumeJsonWorkExp = ({ workExp, index, onWorkExpChange, handleAdd, handleDelete, canDelete }) => {
  const handleOnChange = (e) => {
    const { name, value } = e.target
    onWorkExpChange(index, name, value)
  }

  return (
    <Box w={'100%'}>
      <HStack spacing={10} w={'100%'}>
        <FormControl w={'50%'}>
          <FormLabel>Tên công ty</FormLabel>
          <Input name='companyName' onChange={handleOnChange} value={workExp.companyName} />
        </FormControl>
        <FormControl w={'50%'}>
          <FormLabel>Vị trí/ Chức vụ</FormLabel>
          <Input name='position' onChange={handleOnChange} value={workExp.position} />
        </FormControl>
      </HStack>

      <HStack spacing={10} w={'100%'}>
        <FormControl w={'50%'}>
          <Text>Thời gian bắt đầu</Text>
          <Input name='startWorkingTime' onChange={handleOnChange} type='date' value={workExp.startWorkingTime} />
        </FormControl>
        <FormControl w={'50%'}>
          <Text>Thời gian kết thúc</Text>
          <Input name='endWorkingTime' onChange={handleOnChange} type='date' value={workExp.endWorkingTime} />
        </FormControl>
      </HStack>

      <HStack spacing={10} w={'100%'}>
        <FormControl w={'100%'}>
          <FormLabel>Mô tả công việc</FormLabel>
          <Textarea name='jobDetail' onChange={handleOnChange} value={workExp.jobDetail} />
        </FormControl>
      </HStack>

      <HStack spacing={10} w={'100%'}>
        <FormControl w={'100%'}>
          <FormLabel>Công cụ/công nghệ( nếu có)</FormLabel>
          <Input name='technology' onChange={handleOnChange} placeholder='' value={workExp.technology} />
        </FormControl>
      </HStack>

      <HStack w={'40%'}>
        {canDelete && (
          <Button variant='outline' onClick={() => handleDelete(index)} color={'white'} backgroundColor={'#94a6a6'} mt={2}>
            -
          </Button>
        )}

        <Button variant='outline' onClick={handleAdd} color={'white'} backgroundColor={'#8ebfb4'} ml={2} mt={2}>
          +
        </Button>
      </HStack>
    </Box>
  )
}
