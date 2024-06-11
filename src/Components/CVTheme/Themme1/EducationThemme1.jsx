import { Box, Heading, Text, Button, Tooltip, Stack } from '@chakra-ui/react'
import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import React, { useState } from 'react'

export const EducationThemme1 = ({ educations }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [rows, setRows] = useState(educations)

  const handleAdd = () => {
    const newRows = [...rows, { school: 'Trường', degree: 'Đại học', startEducationTime: '1-1-1111', endEducationTime: '1-1-11111', major: 'Chuyên ngành', others: 'khác' }]
    setRows(newRows)
  }

  const handleRemove = (index) => {
    const newRows = [...rows]
    newRows.splice(index, 1)
    setRows(newRows)
  }
  return (
    <>
      {rows.map((edu, index) => (
        <Box mt={4} key={index} onMouseEnter={() => setHoveredIndex(index)} onMouseLeave={() => setHoveredIndex(null)}>
          <Heading contentEditable as='h4' size='sm'>
            {edu.school}
          </Heading>
          <Text contentEditable mt={0} pt={0} fontStyle={'italic'} fontSize={'sm'}>
            {`${edu.startEducationTime} - ${edu.endEducationTime}`}
          </Text>
          <Stack spacing={0} contentEditable>
            <Text mt={0} pt={0}>
              {edu.degree} in {edu.major}
            </Text>
            <Text mt={0} pt={0}>
              {edu.others}
            </Text>
          </Stack>
          {hoveredIndex === index && (
            <Box>
              <Tooltip label='Add new item'>
                <Button variant='outline' size='xs' colorScheme='green' onClick={handleAdd}>
                  <AddIcon w={3} h={3} />
                </Button>
              </Tooltip>
              <Tooltip label='Remove item'>
                <Button variant='outline' size='xs' colorScheme='red' onClick={() => handleRemove(index)}>
                  <MinusIcon w={3} h={3} />
                </Button>
              </Tooltip>
            </Box>
          )}
        </Box>
      ))}
    </>
  )
}
