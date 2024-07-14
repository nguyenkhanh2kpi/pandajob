import { Box, HStack, Heading, VStack } from '@chakra-ui/react'
import { CometChatConversations, ConversationsStyle, MessagesStyle, TitleAlignment } from '@cometchat/chat-uikit-react'
import React, { useRef, useState } from 'react'
import { AiOutlineBell, AiOutlineMessage } from 'react-icons/ai'
import { ChatWindowAdmin } from './ChatWindowAdmin/ChatWindowAdmin'

const conversationsStyle = new ConversationsStyle({
  width: '100%',
  height: '100%',
  fontFamily: 'Roboto',
})
const avatarStyle = {
  width: '75px',
  height: '75px',
  borderRadius: '50%',
  border: '1px solid white',
}
const listItemStyle = {
  width: '100%',
  height: '100%',
  transition: 'box-shadow 0.3s ease-in-out',
  boxShadow: 'none',
  cursor: 'pointer',
  borderRadius: '10px',
  ':hover': {
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
  },
}
const messagesStyle = new MessagesStyle({
  width: '100%',
  height: '100%',
  background: 'transparent',
  borderRadius: '20px',
  messageTextColor: 'blue',
  messageTextFont: 'sans-serif',
})

export const NotificationMessageAdmin = () => {
  const [showPopover, setShowPopover] = useState(false)
  const buttonRef = useRef(null)
  const [myNotifications, setMynotifications] = useState([])
  const accessToken = JSON.parse(localStorage.getItem('data')).access_token
  const calculatePopoverPosition = () => {
    const buttonRect = buttonRef.current.getBoundingClientRect()
    const left = buttonRect.left - 600
    const top = buttonRect.bottom + 10
    return { left, top }
  }
  const popoverPosition = showPopover ? calculatePopoverPosition() : null

  //   chat
  const [uid, setUid] = useState('')
  const [isChatOpen, setIsChatOpen] = useState(false)
  const toggleChatWindow = () => {
    setIsChatOpen(!isChatOpen)
  }
  const handleOnItemClick = async (item) => {
    await setUid(item.conversationWith.uid)
    setIsChatOpen(!isChatOpen)
    setShowPopover(!showPopover)
  }
  return (
    <>
      <button ref={buttonRef} type='button' onClick={() => setShowPopover(!showPopover)} className='relative text-xl rounded-full p-3 hover:bg-light-gray'>
        {0 > 0 && (
          <div
            style={{
              position: 'absolute',
              top: '-2px',
              right: '-2px',
              height: '20px',
              width: '20px',
              borderRadius: '50%',
              background: 'red',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'white',
            }}>
            {0}
          </div>
        )}
        <AiOutlineMessage />
      </button>
      {isChatOpen ? <ChatWindowAdmin onClose={toggleChatWindow} uid={uid} /> : <></>}
      {showPopover && (
        <div style={{ position: 'absolute', left: popoverPosition.left, top: popoverPosition.top }}>
          <Box fontFamily={'Roboto'} p={1} maxH={600} bgColor={'white'} w={400} boxShadow={'lg'} borderRadius={10} borderWidth={1}>
            <VStack w={'100%'}>
              <HStack w={'100%'} justifyContent={'space-between'}>
                <CometChatConversations onItemClick={handleOnItemClick} listItemStyle={listItemStyle} avatarStyle={avatarStyle} title='' titleAlignment={TitleAlignment.center} conversationsStyle={conversationsStyle} />
              </HStack>
              <VStack spacing={0} m={0} w={'100%'} maxH={500} overflowY={'auto'}></VStack>
            </VStack>
          </Box>
        </div>
      )}
    </>
  )
}
