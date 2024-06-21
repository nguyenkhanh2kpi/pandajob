import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { SiShopware } from 'react-icons/si'
import { MdOutlineCancel } from 'react-icons/md'
import { TooltipComponent } from '@syncfusion/ej2-react-popups'

import { links, interviewerLink, reccerLink } from '../data/dummy'
import { useStateContext } from '../contexts/ContextProvider'
import { useEffect } from 'react'
import { useState } from 'react'
import { Box, Flex, Icon, Image, Text } from '@chakra-ui/react'
import pandalogo from '../Components/assets/pandalogo.jpg'

const Sidebar = () => {
  const data = JSON.parse(localStorage.getItem('data'))
  const [linksRole, setLink] = useState([])

  useEffect(() => {
    if (data.data.role === 'RECRUITER') {
      setLink(reccerLink)
    } else {
      if (data.data.role === 'ADMIN') {
        setLink(links)
      } else {
        setLink(interviewerLink)
      }
    }
  }, [])

  const { currentColor, activeMenu, setActiveMenu, screenSize } = useStateContext()

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false)
    }
  }

  const activeLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2'
  const normalLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2'

  return (
    <Box fontFamily={'Roboto'} fontWeight={'bold'} className='ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10'>
      {activeMenu && (
        <>
          {/* <div className='flex justify-between items-center'>

            <TooltipComponent content='Menu' position='BottomCenter'>
              <button type='button' onClick={() => setActiveMenu(!activeMenu)} style={{ color: currentColor }} className='text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden'>
                <MdOutlineCancel />
              </button>
            </TooltipComponent>
          </div> */}
          <Flex justifyContent='space-between' alignItems='center'>
            <Link to='/' onClick={handleCloseSideBar}>
              <Image h={'72px'} w={'90%'} src={pandalogo} alt='Logo' alignItems={'center'} cursor={'pointer'} />
            </Link>
          </Flex>

          {linksRole.map((item) => (
            <div key={item.title}>
              {item.links.map((link) => (
                <NavLink
                  to={`/${link.name}`}
                  key={link.name}
                  onClick={handleCloseSideBar}
                  style={({ isActive }) => ({
                    backgroundColor: isActive ? currentColor : '',
                  })}
                  className={({ isActive }) => (isActive ? activeLink : normalLink)}>
                  {link.icon}
                  <Text m={0} p={0}>
                    {link.title}
                  </Text>
                </NavLink>
              ))}
            </div>
          ))}
        </>
      )}
    </Box>
  )
}

export default Sidebar
