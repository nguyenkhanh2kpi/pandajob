import { DeleteIcon, SearchIcon, SmallAddIcon } from '@chakra-ui/icons'
import { Alert, AlertIcon, Box, Button, Card, CardBody, HStack, IconButton, Input, InputGroup, InputLeftElement, Spinner, Text, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import ColorPicker from '../../Components-admin/ColorPicker'
import AddLabel from './AddOrUpdateLabel'
import { labelService } from '../../Service/label.service'

export const ManageLabel = () => {
  const accessToken = JSON.parse(localStorage.getItem('data')).access_token
  const [labels, setLabels] = useState(null)
  const [reload, setReload] = useState(false)

  useEffect(() => {
    labelService
      .getMyLabel(accessToken)
      .then((response) => setLabels(response))
      .catch((er) => console.log(er))
  }, [reload])

  const onDeleteLabel = (id) => {
    labelService
      .deleteLabel(accessToken, id)
      .then((response) => setReload(!reload))
      .catch((er) => console.log(er))
  }

  if (labels === null) {
    return (
      <HStack minH={500} w='100%' justifyContent='center' alignItems='center'>
        <Spinner thickness='8px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='4xl' />
      </HStack>
    )
  } else
    return (
      <Box w={'100%'}>
        <HStack justifyContent={'space-between'} w={'100%'}>
          <InputGroup w={300}>
            <InputLeftElement pointerEvents='none'>
              <SearchIcon color='gray.300' />
            </InputLeftElement>
            <Input type='text' placeholder='Tìm ứng viên' />
          </InputGroup>
          <AddLabel reload={reload} setReload={setReload} />
        </HStack>

        <VStack mt={5} w={'100%'}>
          <Box bgColor={'#FEEBC8'} w={'100%'} as='blockquote' borderRadius={3} borderLeft='4px solid' borderColor='blue.400' pl={4} py={2} mb={4}>
            Hãy tạo nhãn cho việc phần loại ứng viên phù hợp với quy trình tuyển dụng cho công ty của bạn
          </Box>
          <VStack w={'100%'} justifyContent={'flex-start'}>
            {labels.map((label) => (
              <Card w={'50%'} alignSelf={'flex-start'}>
                <CardBody>
                  <HStack justifyContent={'space-between'}>
                    <HStack align='center'>
                      <Box w={5} h={5} borderRadius={'50%'} bgColor={label.color}></Box>
                      <Text>{label.name}</Text>
                    </HStack>

                    <HStack>
                      <IconButton onClick={() => onDeleteLabel(label.id)} color={'red'} aria-label='-' icon={<DeleteIcon />} />
                    </HStack>
                  </HStack>
                </CardBody>
              </Card>
            ))}
          </VStack>
        </VStack>
      </Box>
    )
}
