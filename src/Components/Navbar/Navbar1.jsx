import React, { useEffect } from 'react'
import { Box, Button, Heading, HStack, Stack, Text, WrapItem, Menu, MenuButton, MenuItem, MenuList, Container, Avatar, Icon, Image } from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { webHost } from '../../global'
import { CometChatUIKit } from '@cometchat/chat-uikit-react'
import ChatContainer from '../Chatbot/Chatbot'
import Notification from './Notification'
import { NotifyMessage } from './NotifyMessage'
import { FaRegUser } from 'react-icons/fa'
import { MdLockOpen } from 'react-icons/md'
import { FaRegFolder } from 'react-icons/fa'
import { CiLogout } from 'react-icons/ci'
import { BiMessage } from 'react-icons/bi'
import pandalogo from '../assets/pandalogo.jpg'
import LiveChatComponent from './LiveChatComponent'

const Navbar1 = () => {
  const navigate = useNavigate()
  const data = JSON.parse(localStorage.getItem('data'))

  const handleLogout = () => {
    console.log('logout')
    if (window.gapi && window.gapi.auth2) {
      const auth2 = window.gapi.auth2.getAuthInstance()
      if (auth2 != null) {
        auth2.signOut().then(auth2.disconnect())
      }
    }
    localStorage.removeItem('data')
    localStorage.removeItem('tokenExpiration')
    localStorage.removeItem('avatar')
    window.location.replace(`${webHost}`)
    CometChatUIKit.logout()
  }

  useEffect(() => {
    const checkTokenExpiration = async () => {
      try {
        const tokenExpiration = localStorage.getItem('tokenExpiration')
        const allowedPaths = ['', '/', '/jobpage', '/events']
        const isAllowedPath = allowedPaths.some((path) => window.location.pathname.startsWith(path))

        if (!tokenExpiration) {
          if (!isAllowedPath) {
            throw new Error('Token not found and not on allowed path')
          }
        } else {
          // Kiểm tra token đã hết hạn
          if (Date.now() >= parseInt(tokenExpiration, 10)) {
            throw new Error('Token expired')
          }
        }
      } catch (error) {
        console.error('Error:', error.message)
        if (error.message === 'Token expired' || error.message === 'Token not found and not on allowed path') {
          console.log('Token expired or not on allowed path, logging out...')
          handleLogout()
        }
      }
    }

    checkTokenExpiration()
  }, [window.location.pathname])
  return (
    <Box fontFamily={'Roboto'} as={Container} zIndex='100' top='0' maxW='100%' h={'72px'} position='fixed' bgColor='white' mb='150px'>
      <ChatContainer />
      <HStack justifyContent={'space-between'} direction='row' w='100%' h='100%' m='auto' display='flex'>
        <Stack direction={'row'} h={'100%'}>
          <Box w={'150px'} h={'100%'} display={'flex'} alignItems={'center'} justifyContent={'center'} cursor={'pointer'}>
            <Link to='/'>
              <Image h={'72px'} w={'90%'} src={pandalogo} alt='Logo' alignItems={'center'} cursor={'pointer'} />
            </Link>
            {/* <Heading onClick={() => navigate('/')} fontStyle={'italic'} fontFamily={'Roboto'}>
              Panda
            </Heading> */}
          </Box>
          <Box h={'100%'} display={'flex'} w={'33.3%'} alignItems={'center'} justifyContent={'center'} fontWeight={'500'} lineHeight={'20px'} color={'#445578'} cursor={'pointer'}>
            <Menu>
              <MenuButton bgColor={'white'} as={Button}>
                Việc làm
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => navigate('/jobpage')}>Tìm việc làm</MenuItem>
                <MenuItem onClick={() => navigate(data?.access_token ? '/jobpage/favorite' : '/login')}>Việc làm yêu thích</MenuItem>
                <MenuItem onClick={() => navigate(data?.access_token ? '/jobpage/applied' : '/login')}>Đã ứng tuyển</MenuItem>
                <MenuItem onClick={() => navigate(data?.access_token ? '/test' : '/login')}>Kiểm tra sàng lọc</MenuItem>
              </MenuList>
            </Menu>
          </Box>

          <Box h={'100%'} display={'flex'} w={'auto'} alignItems={'center'} justifyContent={'center'} fontWeight={'500'} lineHeight={'20px'} color={'#445578'} cursor={'pointer'}>
            <Menu>
              <MenuButton onClick={() => navigate('/companies')} bgColor={'white'} as={Button}>
                Công ty
              </MenuButton>
            </Menu>
          </Box>

          <Box h={'100%'} display={'flex'} w={'33.3%'} alignItems={'center'} justifyContent={'center'} fontWeight={'500'} lineHeight={'20px'} color={'#445578'} cursor={'pointer'}>
            <Menu>
              <MenuButton onClick={() => navigate('/events')} bgColor={'white'} as={Button}>
                Sự kiện
              </MenuButton>
            </Menu>
          </Box>

          <Box h={'100%'} display={'flex'} w={'auto'} alignItems={'center'} justifyContent={'center'} fontWeight={'500'} lineHeight={'20px'} color={'#445578'} cursor={'pointer'}>
            <Menu>
              <MenuButton bgColor={'white'} as={Button}>
                CV
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => navigate(data?.access_token ? '/resume-build' : '/login')}>Tạo CV</MenuItem>
                <MenuItem onClick={() => navigate(data?.access_token ? '/my-cv' : '/login')}>CV của tôi</MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Stack>

        <Stack direction={'row'} h={'100%'} alignItems={'center'}>
          {data !== null ? (
            <HStack w={'100%'}>
              <NotifyMessage />
              <Notification />
              <Menu>
                <MenuButton bgColor={'white'} as={Button} rightIcon={<ChevronDownIcon />}>
                  <WrapItem>
                    <HStack spacing='2'>
                      <Avatar name={data.data.username} src={data.data.userInfo.avatar} size='sm' />
                      <Text mt={3}>{data.data.username}</Text>
                    </HStack>
                  </WrapItem>
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={() => navigate('/userInfo1')}>
                    <Icon as={FaRegUser} mr={1} />
                    Thông tin cá nhân
                  </MenuItem>
                  <MenuItem onClick={() => navigate('/change-password')}>
                    <Icon as={MdLockOpen} mr={1} />
                    Đổi mật khẩu
                  </MenuItem>
                  <MenuItem onClick={() => navigate(data?.access_token ? '/messages' : '/login')}>
                    <Icon as={BiMessage} mr={1} />
                    Tin nhắn
                  </MenuItem>
                  <MenuItem onClick={() => handleLogout()}>
                    <Icon as={CiLogout} mr={1} />
                    Đăng xuất
                  </MenuItem>
                </MenuList>
              </Menu>
            </HStack>
          ) : (
            <HStack>
              <Button border={'1px'} borderColor={'#457eff'} borderRadius={'50px'} color={'#457eff'} bg={'white'} h={'40px'} fontWeight={'600'}>
                <Link to='/login'>Đăng nhập</Link>
              </Button>
              <Button ml={2} border={'none'} borderRadius={'50px'} color={'white'} borderColor={'#ff7555'} bgColor={'#ff7555'} w={'100px'}>
                <Link to='/signup'>Đăng kí</Link>
              </Button>
            </HStack>
          )}
        </Stack>
      </HStack>
      {/* <LiveChatComponent /> */}
    </Box>
  )
}

export default Navbar1
