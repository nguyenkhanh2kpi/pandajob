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
    <Box fontFamily={'Montserrat'} as={Container} zIndex='3' top='0' maxW='100%' h={'72px'} position='fixed' bgColor='white' mb='150px'>
      <Flex direction='row' w='80%' h='100%' m='auto' display='flex'>
        <Box w={'150px'} h={'100%'} display={'flex'} alignItems={'center'} justifyContent={'center'} cursor={'pointer'}>
          <Link to='/'>
            <Image w={'90%'} src={mainlogo} alt='Logo' alignItems={'center'} cursor={'pointer'} />
          </Link>
        </Box>
        <Stack direction={'row'} w={'280px'} h={'100%'} ml={'80px'}>
          <ChatContainer />

          <Box h={'100%'} display={'flex'} w={'33.3%'} alignItems={'center'} justifyContent={'center'} fontWeight={'500'} lineHeight={'20px'} color={'#445578'} cursor={'pointer'}>
            <Menu isOpen={services.isOpen}>
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
            </Menu>
          </Box>

          <Box h={'100%'} display={'flex'} w={'auto'} alignItems={'center'} justifyContent={'center'} fontWeight={'500'} lineHeight={'20px'} color={'#445578'} cursor={'pointer'}>
            <Menu isOpen={false}>
              <MenuButton
                onClick={() => navigate('/companies')}
                as={Button}
                _hover={{
                  background: 'white',
                  border: 'none',
                }}
                border={'none'}
                bgColor={'white'}
                color={'#445578'}>
                Companies
              </MenuButton>
            </Menu>
          </Box>

          <Box h={'100%'} display={'flex'} w={'33.3%'} alignItems={'center'} justifyContent={'center'} fontWeight={'500'} lineHeight={'20px'} color={'#445578'} cursor={'pointer'}>
            <Menu isOpen={services.isOpen}>
              <MenuButton
                onClick={() => navigate('/events')}
                _hover={{
                  background: 'white',
                  border: 'none',
                }}
                border={'none'}
                bgColor={'white'}
                as={Button}
                color={'#445578'}>
                Events
              </MenuButton>
            </Menu>
          </Box>

          <Box h={'100%'} display={'flex'} w={'auto'} alignItems={'center'} justifyContent={'center'} fontWeight={'500'} lineHeight={'20px'} color={'#445578'} cursor={'pointer'}>
            <Menu isOpen={companies.isOpen}>
              <MenuButton
                as={Button}
                onMouseEnter={companies.onOpen}
                onMouseLeave={companies.onClose}
                _hover={{
                  background: 'white',
                  border: 'none',
                }}
                border={'none'}
                bgColor={'white'}
                color={'#445578'}>
                Profile and Carrer
              </MenuButton>
              <MenuList onMouseEnter={companies.onOpen} onMouseLeave={companies.onClose}>
                <MenuItem
                  onClick={() => navigate('/resume')}
                  _hover={{
                    color: '#457eff',
                  }}
                  fontWeight={'500'}
                  color={'#445578'}>
                  Resume
                </MenuItem>
                <MenuItem
                  onClick={() => navigate('/test')}
                  _hover={{
                    color: '#457eff',
                  }}
                  fontWeight={'500'}
                  color={'#445578'}>
                  Test Skill
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Stack>

        <Stack display={'flex'} ml={'340px'} direction={'row'} h={'100%'} w={'350px'} alignItems={'center'} justifyContent={'space-between'}>
          {data !== null ? (
            <div style={{ width: '100%', display: 'flex' }}>
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
                  <MenuItem onClick={() => navigate('/userInfo')}>User info</MenuItem>
                  <MenuItem onClick={() => navigate('/userInfo1')}>User info1</MenuItem>
                  <MenuItem onClick={() => navigate('/messages')}>Messages</MenuItem>
                  <MenuItem onClick={() => navigate('/resume')}>Resume</MenuItem>
                  <MenuItem>
                    <Link to='/logout'>Log Out</Link>
                  </MenuItem>
                </MenuList>
              </Menu>
            </div>
          ) : (
            <div style={{ width: '100%' }}>
              <Button border={'1px'} borderColor={'#457eff'} borderRadius={'50px'} color={'#457eff'} bg={'white'} h={'40px'} w={'80px'} fontWeight={'600'}>
                <Link to='/login'>Login</Link>
              </Button>
              <Button ml={2} border={'none'} borderRadius={'50px'} color={'white'} borderColor={'#ff7555'} bgColor={'#ff7555'} w={'100px'}>
                <Link to='/signup'>Register</Link>
              </Button>
            </div>
          )}

          <Divider borderColor={'#445578'} orientation='vertical' h={'30%'} />

          {data !== null && data.data.role === 'RECRUITER' ? (
            <Button border={'none'} borderRadius={'50px'} color={'white'} borderColor={'#ff7555'} bgColor={'#33CC33'} w={'100px'}>
              <Link to='/job-posting'>Đăng bài</Link>
            </Button>
          ) : (
            <Button style={{ visibility: 'hidden' }}></Button>
          )}
        </Stack>
      </Flex>
    </Box>
  )
}

export default Navbar1
