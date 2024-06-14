import React, { useEffect, useState } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import { FiShoppingCart } from 'react-icons/fi'
import { BsChatLeft } from 'react-icons/bs'
import { RiNotification3Line } from 'react-icons/ri'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { TooltipComponent } from '@syncfusion/ej2-react-popups'

import { Cart, Chat, Notification, UserProfile } from '.'
import { useStateContext } from '../contexts/ContextProvider'
import { Avatar, Box, HStack, Link, Menu, MenuButton, MenuItem, MenuList, Text, WrapItem, Button, IconButton, Icon } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { RiVipCrown2Line } from 'react-icons/ri'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { CiLogout } from 'react-icons/ci'
import { CometChatUIKit } from '@cometchat/chat-uikit-react'
import { webHost } from '../global'
import { BiMessage } from 'react-icons/bi'

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
    <div className='flex justify-between p-2 md:ml-6 md:mr-6 relative'>
      <NavButton title='Menu' customFunc={handleActiveMenu} color={currentColor} icon={<AiOutlineMenu />} />
      <div className='flex'>
        {/* <NavButton title='Cart' customFunc={() => navigate('/vip/my-bills')} color={currentColor} icon={<FiShoppingCart />} /> */}
        <NavButton title='Chat' dotColor='#03C9D7' customFunc={() => handleClick('chat')} icon={<BsChatLeft />} />
        <NavButton title='Notification' dotColor='rgb(254, 201, 15)' customFunc={() => handleClick('notification')} icon={<RiNotification3Line />} />
        <HStack>
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
              <MenuItem onClick={() => navigate('/userInfo')}>Thông tin cá nhân</MenuItem>
              <MenuItem onClick={() => navigate('/userInfo1')}>Thông tin cá nhân 1</MenuItem>
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

        {isClicked.cart && <Cart />}
        {isClicked.chat && <Chat />}
        {isClicked.notification && <Notification />}
        {isClicked.userProfile && <UserProfile />}
      </div>
    </div>
  )
}

export default Navbar
