import { Box, Heading, Text, Button, Tooltip } from '@chakra-ui/react'
import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import React, { useState } from 'react'

export const WokExpThemme1 = ({ workExperience }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [rows, setRows] = useState(workExperience)

  const handleAdd = () => {
    const newRows = [...rows, { position: 'Vị trí', companyName: 'Công ty', startWorkingTime: '1-1-1111', endWorkingTime: '1-1-1111', jobDetail: 'Mô tả cv', technology: 'Công nghệ' }]
    setRows(newRows)
  }

  const handleRemove = (index) => {
    const newRows = [...rows]
    newRows.splice(index, 1)
    setRows(newRows)
  }

  return (
    <>
      {rows.map((experience, index) => (
        <Box fontFamily={'Roboto'} mt={4} key={index} onMouseEnter={() => setHoveredIndex(index)} onMouseLeave={() => setHoveredIndex(null)}>
          <Heading contentEditable as='h4' size='sm'>
            {experience.position} - {experience.companyName}
          </Heading>
          <Text mt={0} pt={0} fontStyle={'italic'} fontSize={'sm'} contentEditable>
            {`${experience.startWorkingTime} - ${experience.endWorkingTime}`}
          </Text>
          <Text contentEditable>
            {experience.jobDetail} - {experience.technology}{' '}
          </Text>
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
