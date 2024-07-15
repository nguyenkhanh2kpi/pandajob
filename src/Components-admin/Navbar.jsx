import React, { useEffect, useState } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import { FiShoppingCart } from 'react-icons/fi'
import { BsChatLeft } from 'react-icons/bs'
import { RiNotification3Line } from 'react-icons/ri'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { TooltipComponent } from '@syncfusion/ej2-react-popups'

import { Cart, Chat, UserProfile } from '.'
import { useStateContext } from '../contexts/ContextProvider'
import { Avatar, Box, HStack, Link, Menu, MenuButton, MenuItem, MenuList, Text, WrapItem, Button, IconButton, Icon, Flex } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { RiVipCrown2Line } from 'react-icons/ri'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { CiLogout } from 'react-icons/ci'
import { CometChatUIKit } from '@cometchat/chat-uikit-react'
import { webHost } from '../global'
import { BiMessage } from 'react-icons/bi'
import { NotifyMessage } from '../Components/Navbar/NotifyMessage'
import Notification from '../Components/Navbar/Notification'
import { NotificationAdmin } from './NotificationAdmin'
import { NotificationMessageAdmin } from './NotificationMessageAdmin'
import { FaRegUser } from 'react-icons/fa'

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title} position='BottomCenter'>
    <button type='button' onClick={() => customFunc()} style={{ color }} className='relative text-xl rounded-full p-3 hover:bg-light-gray'>
      <span style={{ background: dotColor }} className='absolute inline-flex rounded-full h-2 w-2 right-2 top-2' />
      {icon}
    </button>
  </TooltipComponent>
)

const Navbar = () => {
  const navigate = useNavigate()
  const data = JSON.parse(localStorage.getItem('data'))
  const user = JSON.parse(localStorage.getItem('data')).userInfo
  const avatar = JSON.parse(localStorage.getItem('avatar'))
  const { currentColor, activeMenu, setActiveMenu, handleClick, isClicked, setScreenSize, screenSize } = useStateContext()

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth)

    window.addEventListener('resize', handleResize)

    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false)
    } else {
      setActiveMenu(true)
    }
  }, [screenSize])

  const handleActiveMenu = () => setActiveMenu(!activeMenu)

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
    <Flex justifyContent='space-between' p={2} mx={{ base: 0, md: 6 }} position='relative'>
      <NavButton title='Menu' customFunc={handleActiveMenu} color={currentColor} icon={<AiOutlineMenu />} />
      <HStack spacing={4}>
        <NotificationMessageAdmin />
        <NotificationAdmin />
        <Menu>
          <MenuButton as={Button} bgColor='white' rightIcon={<ChevronDownIcon />}>
            <WrapItem>
              <HStack spacing={2}>
                <Avatar name={data.data.username} src={data.data.userInfo.avatar} size='sm' />
                <Text mt={2}>{data.data.username}</Text>
              </HStack>
            </WrapItem>
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => navigate('/userInfo1')}>
              <Icon as={FaRegUser} mr={1} />
              Thông tin cá nhân
            </MenuItem>
            <MenuItem onClick={() => navigate(data?.access_token ? '/messages' : '/login')}>
              <Icon as={BiMessage} mr={1} />
              Tin nhắn
            </MenuItem>
            <MenuItem onClick={() => navigate(data?.access_token ? '/change-password' : '/login')}>
              <Icon as={BiMessage} mr={1} />
              Đổi mật khẩu
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <Icon as={CiLogout} mr={1} />
              Đăng xuất
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </Flex>
  )
}

export default Navbar
