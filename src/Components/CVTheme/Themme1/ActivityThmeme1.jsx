import { Box, Heading, Text, Button, Tooltip, Stack } from '@chakra-ui/react'
import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import React, { useState } from 'react'

export const ActiviyThemme1 = ({ activities }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [rows, setRows] = useState(activities)

  const handleAdd = () => {
    const newRows = [
      ...rows,
      {
        start: '1-1-1111',
        end: '1-1-1111',
        name_organization: 'Tên tổ chức',
        position: 'vai trò',
        description: 'mô tả',
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
      {rows.map((activity, index) => (
        <Box fontFamily={'Roboto'} mt={4} key={index} onMouseEnter={() => setHoveredIndex(index)} onMouseLeave={() => setHoveredIndex(null)}>
          <Heading contentEditable as='h4' size='sm'>
            {activity.name_organization}
          </Heading>
          <Text contentEditable mt={0} pt={0} fontStyle={'italic'} fontSize={'sm'}>{`${activity.start} - ${activity.end}`}</Text>

          <Text contentEditable>
            {activity.position} - {activity.description}
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
