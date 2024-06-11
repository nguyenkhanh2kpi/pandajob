import { Box, Heading, Text, Button, Tooltip } from '@chakra-ui/react'
import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import React, { useState } from 'react'

export const CertificateThemme1 = ({ certificates }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [rows, setRows] = useState(certificates)

  const handleAdd = () => {
    const newRows = [
      ...rows,
      {
        time: 'thời gian',
        name: 'chứng chỉ',
      },
    ]
    setRows(newRows)
  }

  const handleRemove = (index) => {
    const newRows = [...rows]
    newRows.splice(index, 1)
    setRows(newRows)
  }

  return (
    <>
      {rows.map((cert, index) => (
        <Box fontFamily={'Roboto'} mt={4} key={index} onMouseEnter={() => setHoveredIndex(index)} onMouseLeave={() => setHoveredIndex(null)}>
          <Text contentEditable>{`${cert.time} - ${cert.name}`}</Text>
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
