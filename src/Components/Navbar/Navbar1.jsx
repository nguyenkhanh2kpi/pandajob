import React from 'react'
import { Badge, Box, Button, Card, CardBody, Flex, Heading, HStack, IconButton, Image, SlideFade, Stack, Text, Wrap, WrapItem, useDisclosure, Menu, MenuButton, MenuItem, MenuList, Container, Divider, Avatar, VStack } from '@chakra-ui/react'

import mainlogo from '../../Components/req/jobpandacom-logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { ChatIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { GoogleLogout } from 'react-google-login'
import { webHost } from '../../global'
import { CometChatUIKit } from '@cometchat/chat-uikit-react'
import ChatContainer from '../Chatbot/Chatbot'

const client_id = '854899780211-p148qqqvv8svo8mmviv8tuf6sbmip7iq.apps.googleusercontent.com'
const Navbar1 = () => {
  const navigate = useNavigate()

  // const employers = useDisclosure()
  // const jobs = useDisclosure()
  const companies = useDisclosure()
  const services = useDisclosure()
  const data = JSON.parse(localStorage.getItem('data'))

  // const handleLogout = () => {
  //   console.log('logout')
  //   const auth2 = window.gapi.auth2.getAuthInstance()
  //   if (auth2 != null) {
  //     auth2.signOut().then(auth2.disconnect())
  //   }
  //   localStorage.removeItem('data')
  //   window.location.replace(`${webHost}`)
  // }
  const handleLogout = () => {
    console.log('logout')
    if (window.gapi && window.gapi.auth2) {
      const auth2 = window.gapi.auth2.getAuthInstance()
      if (auth2 != null) {
        auth2.signOut().then(auth2.disconnect())
      }
    }
    localStorage.removeItem('data')
    window.location.replace(`${webHost}`)
    CometChatUIKit.logout()
  }

  return (
    <Box fontFamily={'Montserrat'} as={Container} zIndex='100' top='0' maxW='100%' h={'72px'} position='fixed' bgColor='white' mb='150px'>
      <HStack justifyContent={'space-between'}  direction='row' w='82%' h='100%' m='auto' display='flex'>
        <Box w={'150px'} h={'100%'} display={'flex'} alignItems={'center'} justifyContent={'center'} cursor={'pointer'}>
          <Link to='/'>
            <Image w={'90%'} src={mainlogo} alt='Logo' alignItems={'center'} cursor={'pointer'} />
          </Link>
        </Box>
        <Stack direction={'row'} h={'100%'}>
          <ChatContainer />
          <Box h={'100%'} display={'flex'} w={'33.3%'} alignItems={'center'} justifyContent={'center'} fontWeight={'500'} lineHeight={'20px'} color={'#445578'} cursor={'pointer'}>
            {/* <Menu isOpen={services.isOpen}>
              <MenuButton
                onClick={() => navigate('/jobpage')}
                _hover={{
                  background: 'white',
                  border: 'none',
                }}
                border={'none'}
                bgColor={'white'}
                as={Button}
                color={'#445578'}>
                Jobs
              </MenuButton>
            </Menu> */}
            <Menu>
              <MenuButton bgColor={'white'} as={Button}>
                Việc làm
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => navigate('/jobpage')}>Tìm việc làm</MenuItem>
                <MenuItem>Việc làm yêu thích</MenuItem>
                <MenuItem>Đã ứng tuyển</MenuItem>
              </MenuList>
            </Menu>
          </Box>

          <Box h={'100%'} display={'flex'} w={'auto'} alignItems={'center'} justifyContent={'center'} fontWeight={'500'} lineHeight={'20px'} color={'#445578'} cursor={'pointer'}>
            <Menu>
              <MenuButton bgColor={'white'} as={Button}>
                Công ty
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => navigate('/companies')}>Tìm công ty</MenuItem>
                {/* <MenuItem>Việc làm yêu thích</MenuItem>
                <MenuItem>Đã ứng tuyển</MenuItem> */}
              </MenuList>
            </Menu>
          </Box>

          <Box h={'100%'} display={'flex'} w={'33.3%'} alignItems={'center'} justifyContent={'center'} fontWeight={'500'} lineHeight={'20px'} color={'#445578'} cursor={'pointer'}>
            <Menu>
              <MenuButton bgColor={'white'} as={Button}>
                Sự kiện
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => navigate('/events')}>Xem sự kiện</MenuItem>
                {/* <MenuItem>Việc làm yêu thích</MenuItem>
                <MenuItem>Đã ứng tuyển</MenuItem> */}
              </MenuList>
            </Menu>
          </Box>

          <Box h={'100%'} display={'flex'} w={'auto'} alignItems={'center'} justifyContent={'center'} fontWeight={'500'} lineHeight={'20px'} color={'#445578'} cursor={'pointer'}>
            <Menu>
              <MenuButton bgColor={'white'} as={Button}>
                Hồ sơ
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => navigate('/resume')}>Resume</MenuItem>
                <MenuItem>CV của tôi</MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Stack>

        <Stack direction={'row'} h={'100%'} alignItems={'center'}>
          {data !== null ? (
            <HStack w={'100%'}>
              <Menu>
                <MenuButton bgColor={'white'} ml={5} as={Button} rightIcon={<ChevronDownIcon />}>
                  <WrapItem>
                    <HStack spacing='2'>
                      <Avatar name={data.data.username} src={data.data.userInfo.avatar} size='sm' />
                      <Text mt={3}>{data.data.username}</Text>
                    </HStack>
                  </WrapItem>
                </MenuButton>
                <MenuList>
                  {/* <MenuItem onClick={() => navigate('/userInfo')}>User info</MenuItem> */}
                  <MenuItem onClick={() => navigate('/userInfo1')}>User info</MenuItem>
                  <MenuItem onClick={() => navigate('/messages')}>Messages</MenuItem>
                  <MenuItem onClick={() => navigate('/resume')}>Resume</MenuItem>
                  <MenuItem>
                    <Link to='/logout'>Log Out</Link>
                  </MenuItem>
                </MenuList>
              </Menu>
            </HStack>
          ) : (
            <HStack>
              <Button border={'1px'} borderColor={'#457eff'} borderRadius={'50px'} color={'#457eff'} bg={'white'} h={'40px'} w={'80px'} fontWeight={'600'}>
                <Link to='/login'>Login</Link>
              </Button>
              <Button ml={2} border={'none'} borderRadius={'50px'} color={'white'} borderColor={'#ff7555'} bgColor={'#ff7555'} w={'100px'}>
                <Link to='/signup'>Register</Link>
              </Button>
            </HStack>
          )}
        </Stack>
      </HStack>
    </Box>
  )
}

export default Navbar1
