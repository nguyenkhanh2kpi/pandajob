import { AddIcon, EmailIcon, LinkIcon, MinusIcon, PhoneIcon, StarIcon, AttachmentIcon, CalendarIcon } from '@chakra-ui/icons'
import { Button, HStack, Icon, List, ListItem, Text, Input, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverBody, IconButton, Box } from '@chakra-ui/react'
import React, { useState } from 'react'

export const InfomationBasic = ({ phone, email, linkedIn, github, jsonData }) => {
  const initialRows = [
    { type: 'phone', value: phone || jsonData.phone },
    { type: 'email', value: email || jsonData.email },
    { type: 'linkedIn', value: linkedIn || jsonData.linkedIn },
    { type: 'github', value: github || jsonData.github },
  ]

  const [rows, setRows] = useState(initialRows)
  const [hoveredIndex, setHoveredIndex] = useState(null)

  const handleMouseEnter = (index) => setHoveredIndex(index)
  const handleMouseLeave = () => setHoveredIndex(null)

  const addRow = () => {
    setRows([...rows, { type: 'link', value: 'New link' }])
  }

  const removeRow = (index) => {
    setRows(rows.filter((_, i) => i !== index))
  }

  const handleInputChange = (index, newValue) => {
    const newRows = [...rows]
    newRows[index].value = newValue
    setRows(newRows)
  }

  const handleIconChange = (index, newType) => {
    const newRows = [...rows]
    newRows[index].type = newType
    setRows(newRows)
  }

  const renderIcon = (type) => {
    switch (type) {
      case 'phone':
        return PhoneIcon
      case 'email':
        return EmailIcon
      case 'linkedIn':
        return LinkIcon
      case 'github':
        return LinkIcon
      case 'star':
        return StarIcon
      case 'attachment':
        return AttachmentIcon
      case 'calendar':
        return CalendarIcon
      case 'link':
      default:
        return LinkIcon
    }
  }

  const iconOptions = [
    { type: 'phone', icon: PhoneIcon },
    { type: 'email', icon: EmailIcon },
    { type: 'linkedIn', icon: LinkIcon },
    { type: 'github', icon: LinkIcon },
    { type: 'star', icon: StarIcon },
    { type: 'attachment', icon: AttachmentIcon },
    { type: 'calendar', icon: CalendarIcon },
  ]

  return (
    <List spacing={0} mt={4}>
      {rows.map((row, index) => (
        <ListItem m={0} p={0} key={index} onMouseEnter={() => handleMouseEnter(index)} onMouseLeave={handleMouseLeave} position='relative'>
          <HStack m={0} p={0} spacing={0} w={'100%'}>
            <Popover placement='bottom' autoFocus={false}>
              <PopoverTrigger>
                <Button m={0} variant='unstyled' minW={0} p={0} display='flex' alignItems='center' justifyContent='center'>
                  <Icon m={0} p={0} as={renderIcon(row.type)} />
                </Button>
              </PopoverTrigger>
              <PopoverContent width='auto' maxW='200px' p={2} boxShadow='lg' border='1px solid' borderColor='gray.200'>
                <PopoverArrow />
                <PopoverCloseButton size='sm' />
                <PopoverBody display='flex' flexWrap='wrap' gap={1}>
                  {iconOptions.map((option) => (
                    <IconButton
                      key={option.type}
                      icon={<Icon as={option.icon} w={4} h={4} />}
                      onClick={() => handleIconChange(index, option.type)}
                      aria-label={option.type}
                      variant='ghost'
                      size='sm'
                      minW='unset' // Override Chakra's default min width
                      w='32px' // Set a fixed width
                      h='32px' // Set a fixed height
                      borderRadius='md'
                      p={0}
                    />
                  ))}
                </PopoverBody>
              </PopoverContent>
            </Popover>
            <Input m={0} p={0} ml={3} value={row.value} onChange={(e) => handleInputChange(index, e.target.value)} variant='unstyled' />
            {hoveredIndex === index && (
              <HStack spacing={1} position='absolute' right='0'>
                <Button variant='outline' size='xs' colorScheme='green' onClick={addRow}>
                  <AddIcon w={3} h={3} />
                </Button>
                <Button variant='outline' size='xs' colorScheme='red' onClick={() => removeRow(index)}>
                  <MinusIcon w={3} h={3} />
                </Button>
              </HStack>
            )}
          </HStack>
        </ListItem>
      ))}
    </List>
  )
}
