import React from 'react'
import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  HStack,
  IconButton,
  Image,
  SlideFade,
  Stack,
  Text,
  Wrap,
  WrapItem,
  useDisclosure,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Container,
  Divider,
} from '@chakra-ui/react';


import mainlogo from '../../Components/req/jobpandacom-logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { ChatIcon } from '@chakra-ui/icons'
import { GoogleLogout } from 'react-google-login'
import { webHost } from '../../global'

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
  }

  return (
    <Box
      fontFamily={'Montserrat'}
      as={Container}
      zIndex='3'
      top='0'
      maxW='100%'
      h={'72px'}
      position='fixed'
      bgColor='white'
      mb='150px'>
      <Flex direction='row' w='80%' h='100%' m='auto' display='flex'>
        <Box
          w={'150px'}
          h={'100%'}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
          cursor={'pointer'}>
          <Link to='/'>
            <Image w={'90%'} src={mainlogo} alt='Logo' alignItems={'center'} cursor={'pointer'} />
          </Link>
        </Box>
        <Stack direction={'row'} w={'280px'} h={'100%'} ml={'80px'}>
          {/*           
          <Box h={'100%'} display={'flex'} w={'33.3%'} alignItems={'center'} justifyContent={'center'} fontWeight={'500'} lineHeight={'20px'} color={'#445578'} cursor={'pointer'}>
            <Menu isOpen={jobs.isOpen}>
              <Button
                _hover={{
                  background: 'none',
                  border: 'none',
                  textDecoration: 'none',
                }}
                border={'none'}
                bgColor={'white'}
                as={Button}
                color={'#445578'}>
                <Link to='/jobpage'>Jobs</Link>
              </Button>
            </Menu>
          </Box> */}

          <Box
            h={'100%'}
            display={'flex'}
            w={'33.3%'}
            alignItems={'center'}
            justifyContent={'center'}
            fontWeight={'500'}
            lineHeight={'20px'}
            color={'#445578'}
            cursor={'pointer'}>
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

          <Box
            h={'100%'}
            display={'flex'}
            w={'auto'}
            alignItems={'center'}
            justifyContent={'center'}
            fontWeight={'500'}
            lineHeight={'20px'}
            color={'#445578'}
            cursor={'pointer'}>
            <Menu isOpen={false}>
              <MenuButton
                onClick={() => navigate('/companies')}
                as={Button}
                // onMouseEnter={companies.onOpen}
                // onMouseLeave={companies.onClose}
                _hover={{
                  background: 'white',
                  border: 'none',
                }}
                border={'none'}
                bgColor={'white'}
                color={'#445578'}>
                Companies
              </MenuButton>
              {/* <MenuList onMouseEnter={companies.onOpen} onMouseLeave={companies.onClose}>
                <MenuItem
                  _hover={{
                    color: '#457eff',
                  }}
                  fontWeight={'500'}
                  color={'#445578'}>
                  Unicorn
                </MenuItem>
              </MenuList> */}
            </Menu>
          </Box>

          <Box
            h={'100%'}
            display={'flex'}
            w={'33.3%'}
            alignItems={'center'}
            justifyContent={'center'}
            fontWeight={'500'}
            lineHeight={'20px'}
            color={'#445578'}
            cursor={'pointer'}>
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

          <Box
            h={'100%'}
            display={'flex'}
            w={'auto'}
            alignItems={'center'}
            justifyContent={'center'}
            fontWeight={'500'}
            lineHeight={'20px'}
            color={'#445578'}
            cursor={'pointer'}>
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

          {/*  */}

          {/* <Box h={'100%'} display={'flex'} w={'33.3%'} alignItems={'center'} justifyContent={'center'} fontWeight={'500'} lineHeight={'20px'} color={'#445578'} cursor={'pointer'}>
            <Menu isOpen={services.isOpen}>
              <Button
                _hover={{
                  background: 'white',
                  border: 'none',
                }}
                border={'none'}
                bgColor={'white'}
                as={Button}
                color={'#445578'}>
                <Link to='/services'> Services </Link>
              </Button>
              <MenuList onMouseEnter={services.onOpen} onMouseLeave={services.onClose}>
                <MenuItem fontWeight={'600'} fontSize={'17px'} color={'#1b2437'} cursor={'default'}>
                  Resume Writing
                </MenuItem>
                <MenuItem
                  _hover={{
                    color: '#457eff',
                  }}
                  fontWeight={'500'}
                  color={'#445578'}>
                  Visual Resume
                </MenuItem>
                <MenuItem
                  _hover={{
                    color: '#457eff',
                  }}
                  fontWeight={'500'}
                  color={'#445578'}>
                  Resume critique
                </MenuItem>
                <MenuItem
                  _hover={{
                    color: '#457eff',
                  }}
                  fontWeight={'500'}
                  color={'#445578'}>
                  Text Resume
                </MenuItem>
                <br />
                <MenuItem fontWeight={'600'} fontSize={'17px'} color={'#1b2437'} cursor={'default'}>
                  Find Jobs
                </MenuItem>
                <MenuItem
                  _hover={{
                    color: '#457eff',
                  }}
                  fontWeight={'500'}
                  color={'#445578'}>
                  Jobs4u
                </MenuItem>
                <MenuItem
                  _hover={{
                    color: '#457eff',
                  }}
                  fontWeight={'500'}
                  color={'#445578'}>
                  Priority applicant
                </MenuItem>
                <MenuItem
                  _hover={{
                    color: '#457eff',
                  }}
                  fontWeight={'500'}
                  color={'#445578'}>
                  Contact us
                </MenuItem>
              </MenuList>
            </Menu>
          </Box> */}
        </Stack>

        <Stack
          display={'flex'}
          ml={'340px'}
          direction={'row'}
          h={'100%'}
          w={'350px'}
          alignItems={'center'}
          justifyContent={'space-between'}>
          {data !== null ? (
            <div style={{ width: '100%', display: 'flex' }}>
              <Button
                border={'1px'}
                borderColor={'#457eff'}
                borderRadius={'50px'}
                color={'#457eff'}
                bg={'white'}
                h={'40px'}
                w={'auto'}
                fontWeight={'600'}>
                <Link to='/userInfo'>{data.data.username}</Link>
              </Button>
              <IconButton
                onClick={() => navigate('/messages')}
                border={'1px'}
                borderColor={'#457eff'}
                borderRadius={'50px'}
                aria-label='Call Segun'
                h={'40px'}
                w={'auto'}
                size='lg'
                ml={2}
                icon={<ChatIcon color={'#457eff'} />}
              />
              {/* 
              <MessageList/> */}
              <Button
                ml={2}
                border={'none'}
                borderRadius={'50px'}
                color={'white'}
                borderColor={'#ff7555'}
                bgColor={'#ff7555'}
                onClick={handleLogout}
                w={'100px'}>
                {/* <Link to='/logout'>Log Out</Link> */}
                Log Out
              </Button>
              {/* <GoogleLogout
                clientId={client_id}
                buttonText='Dang xuat'
                onLogoutSuccess={() => console.log('logout')}
              /> */}
            </div>
          ) : (
            <div style={{ width: '100%' }}>
              <Button
                border={'1px'}
                borderColor={'#457eff'}
                borderRadius={'50px'}
                color={'#457eff'}
                bg={'white'}
                h={'40px'}
                w={'80px'}
                fontWeight={'600'}>
                <Link to='/login'>Login</Link>
              </Button>
              <Button
                ml={2}
                border={'none'}
                borderRadius={'50px'}
                color={'white'}
                borderColor={'#ff7555'}
                bgColor={'#ff7555'}
                w={'100px'}>
                <Link to='/signup'>Register</Link>
              </Button>
            </div>
          )}

          <Divider borderColor={'#445578'} orientation='vertical' h={'30%'} />

          {data !== null && data.data.role === 'RECRUITER' ? (
            <Button
              border={'none'}
              borderRadius={'50px'}
              color={'white'}
              borderColor={'#ff7555'}
              bgColor={'#33CC33'}
              w={'100px'}>
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
