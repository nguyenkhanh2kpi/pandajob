import React from 'react'
import { Menu, MenuButton, MenuList, MenuItem, IconButton, Flex, Box, Text, Badge } from '@chakra-ui/react'
import { BellIcon } from '@chakra-ui/icons'

export const NotificationAdmin = () => {
  // Sample notifications with a 'read' status
  const notifications = [
    { id: 1, message: 'New message received', time: '2 mins ago', read: false },
    { id: 2, message: 'Server update available', time: '10 mins ago', read: true },
    { id: 3, message: 'New comment on your post', time: '30 mins ago', read: true },
    // Repeat for demonstration
    { id: 4, message: 'New comment on your post', time: '30 mins ago', read: true },
    { id: 5, message: 'New comment on your post', time: '30 mins ago', read: true },
    { id: 6, message: 'New comment on your post', time: '30 mins ago', read: true },
    { id: 7, message: 'New comment on your post', time: '30 mins ago', read: true },
    { id: 8, message: 'New comment on your post', time: '30 mins ago', read: true },
    { id: 9, message: 'New comment on your post', time: '30 mins ago', read: true },
    { id: 10, message: 'New comment on your post', time: '30 mins ago', read: false },
    { id: 11, message: 'New comment on your post', time: '30 mins ago', read: false },
    { id: 12, message: 'New comment on your post', time: '30 mins ago', read: false },
    { id: 13, message: 'New comment on your post', time: '30 mins ago', read: true },
    { id: 14, message: 'New comment on your post', time: '30 mins ago', read: true },
    { id: 15, message: 'New comment on your post', time: '30 mins ago', read: true },
    { id: 16, message: 'New comment on your post', time: '30 mins ago', read: false },
    { id: 17, message: 'New comment on your post', time: '30 mins ago', read: true },
    { id: 18, message: 'New comment on your post', time: '30 mins ago', read: false },
    { id: 19, message: 'New comment on your post', time: '30 mins ago', read: false },
    { id: 20, message: 'New comment on your post', time: '30 mins ago', read: false },
  ]

  // Count unread notifications
  const unreadCount = notifications.filter((notification) => !notification.read).length

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        icon={
          <Box position='relative'>
            <BellIcon />
            {unreadCount > 0 && (
              <Badge colorScheme='red' borderRadius='full' boxSize={4} position='absolute' top={-1} right={-1} display='flex' alignItems='center' justifyContent='center' fontSize='0.6em'>
                {unreadCount}
              </Badge>
            )}
          </Box>
        }
        aria-label='Notifications'
        bgColor='white'
        _hover={{ backgroundColor: 'white' }}
        borderWidth={0}
      />
      <MenuList fontFamily={'Roboto'} w='300px'>
        <Text ml={3} fontWeight={'bold'}>
          Thông báo
        </Text>
        <Box maxH='400px' overflowY='auto'>
          {notifications.length === 0 ? (
            <MenuItem>No new notifications</MenuItem>
          ) : (
            notifications.map((notification) => (
              <MenuItem fontFamily={'Roboto'} key={notification.id}>
                <Flex direction='column'>
                  <Text m={0} p={0}>
                    {notification.message}
                  </Text>
                  <Text m={0} p={0} fontSize='sm' color='gray.500'>
                    {notification.time}
                  </Text>
                </Flex>
              </MenuItem>
            ))
          )}
        </Box>
      </MenuList>
    </Menu>
  )
}
