import { Box, Heading, Text, Button, Tooltip, Stack, UnorderedList, ListItem } from '@chakra-ui/react'
import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import React, { useState } from 'react'

export const ProjectThemme1 = ({ projects }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [rows, setRows] = useState(projects)

  const handleAdd = () => {
    const newRows = [
      ...rows,
      {
        nameProject: 'Dự án',
        startTime: '1-1-1111',
        endTime: '1-1-1111',
        client: 'khách hàng',
        description: 'mô tả',
        members: 'thành viên',
        position: 'vị trí công việc',
        responsibilities: 'trách nhiệm - vai trò',
        technology: 'công nghệ công cụ sử dụng',
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
      {rows.map((project, index) => (
        <Box mt={4} key={index} onMouseEnter={() => setHoveredIndex(index)} onMouseLeave={() => setHoveredIndex(null)}>
          <Heading contentEditable as='h4' size='sm'>
            {project.nameProject} - {project.client}
          </Heading>
          <Text contentEditable mt={0} pt={0} fontStyle={'italic'} fontSize={'sm'}>{`${project.startTime} - ${project.endTime}`}</Text>
          <Stack contentEditable>
            <Text m={0} p={0}>
              {project.position} - {project.technology}
            </Text>
            <Text m={0} p={0}>
              {project.description}
            </Text>
            <UnorderedList m={0} p={0} listStyleType='disc' ml={4}>
              {project.responsibilities.split('. ').map((item, idx) => (
                <ListItem key={idx}>{item}</ListItem>
              ))}
            </UnorderedList>
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
