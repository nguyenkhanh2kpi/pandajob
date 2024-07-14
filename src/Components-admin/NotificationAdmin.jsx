import React, { useEffect, useState } from 'react'
import { Menu, MenuButton, MenuList, MenuItem, IconButton, Flex, Box, Text, Badge, Icon, HStack, Link, Card, Heading } from '@chakra-ui/react'
import { BellIcon, CheckIcon } from '@chakra-ui/icons'
import { notifyService } from '../Service/notify.service'
import { format } from 'date-fns'

export const NotificationAdmin = () => {
  // Sample notifications with a 'read' status

  const [myNotifications, setMynotifications] = useState([])
  const accessToken = JSON.parse(localStorage.getItem('data')).access_token

  const fetchNotifications = () => {
    notifyService.getMyNotify(accessToken).then((response) => setMynotifications(response))
  }

  useEffect(() => {
    fetchNotifications()
  }, [accessToken])

  const formatDate = (dateString) => {
    return format(new Date(dateString), 'yyyy-MM-dd HH:mm')
  }

  const changeStatus = async (id) => {
    try {
      const response = await notifyService.changeStatus(accessToken, id)
      setMynotifications((prevNotifications) => prevNotifications.map((notification) => (notification.id === id ? { ...notification, status: response.status } : notification)))
    } catch (error) {
      console.error('Error updating notification status:', error)
    }
  }

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        icon={
          <Box position='relative'>
            <BellIcon />
            {1 > 0 && (
              <Badge colorScheme='red' borderRadius='full' boxSize={4} position='absolute' top={-1} right={-1} display='flex' alignItems='center' justifyContent='center' fontSize='0.6em'>
                {1}
              </Badge>
            )}
          </Box>
        }
        aria-label='Notifications'
        bgColor='white'
        _hover={{ backgroundColor: 'white' }}
        borderWidth={0}
      />
      <MenuList fontFamily={'Roboto'} w='500px'>
        <Text ml={3} fontWeight={'bold'}>
          Thông báo
        </Text>
        <Box maxH='400px' overflowY='auto'>
          {myNotifications.length === 0 ? (
            <MenuItem>No new notifications</MenuItem>
          ) : (
            myNotifications.map((notification) => (
              <MenuItem fontFamily='Roboto' key={notification.id}>
                <Card p={2} key={notification.id} w={'100%'}>
                  <Heading fontFamily={'Roboto'} size={'sm'}>
                    {notification.title}
                    {notification.status === 'UNREAD' ? (
                      <Icon viewBox='0 0 200 200' color='red.500'>
                        <path fill='currentColor' d='M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0' />
                      </Icon>
                    ) : (
                      <></>
                    )}
                  </Heading>
                  <Link onClick={() => changeStatus(notification.id)} href={notification.link} isExternal>
                    {notification.message}
                  </Link>
                  <HStack justifyContent={'space-between'} w={'100%'}>
                    <Text>{format(new Date(notification.createdAt), 'PPpp')}</Text>
                    <CheckIcon onClick={() => changeStatus(notification.id)} />
                  </HStack>
                </Card>
              </MenuItem>
            ))
          )}
        </Box>
      </MenuList>
    </Menu>
  )
}
