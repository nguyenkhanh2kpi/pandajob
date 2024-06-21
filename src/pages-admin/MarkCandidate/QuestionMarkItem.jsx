import { Box, Button, FormLabel, HStack, Input, Text, VStack, useDisclosure } from '@chakra-ui/react'
import { NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { AddQuestionInterview } from './AddQuestionInterview'
import { DeleteIcon } from '@chakra-ui/icons'
export const QuestionMarkItem = ({ field, question, onAddClick, onDeleteClick }) => {
  useEffect(() => {}, [field])
  return (
    <HStack mt={5} w={'100%'}>
      <FormLabel w={'20%'}>{field}</FormLabel>
      <Box w={'100%'}>
        <HStack w={'100%'}>
          <Box w={'84%'}>
            <VStack w={'100%'}>
              {question.map((question) => (
                <HStack w={'100%'} justifyContent={'space-between'}>
                  <Text fontSize={'md'} borderRadius={5} borderWidth={1} w={'100%'} p={1}>
                    {question.question}
                    <HStack spacing={0}>
                      <Text fontSize={'sm'} m={0} p={0} fontWeight={'bold'}>
                        Điểm: {question.mark}
                      </Text>
                      <DeleteIcon onClick={() => onDeleteClick(question.id, field === 'SoftSkill' ? 'softSkill' : field === 'TechSkill' ? 'technical' : 'english')} />
                    </HStack>
                  </Text>
                </HStack>
              ))}
            </VStack>
          </Box>
          <AddQuestionInterview field={field} onAddClick={onAddClick} />
        </HStack>
      </Box>
    </HStack>
  )
}
