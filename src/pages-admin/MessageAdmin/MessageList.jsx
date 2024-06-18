import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Card, HStack, VStack } from '@chakra-ui/react'
import React from 'react'
import { ConversationsStyle, MessagesStyle } from '@cometchat/uikit-shared'
import { CometChatConversations, CometChatMessages, TitleAlignment } from '@cometchat/chat-uikit-react'
import { useState } from 'react'
import { CometChat } from '@cometchat/chat-sdk-javascript'
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

const MessageAdmin = () => {
  const data = JSON.parse(localStorage.getItem('data'))
  const [chatUser, setChatUser] = useState('')

  const handleOnItemClick = (item) => {
    CometChat.getUser(item.conversationWith.uid).then((user) => {
      setChatUser(user)
    })
  }

  return (
    <Box fontFamily={'Roboto'} fontWeight={400} backgroundColor={'white'} overflow='hidden'>
      <VStack h={600} spacing={10}>
        <HStack h={600} w={'100%'}>
          <Box h={'100%'} w={'30%'}>
            <CometChatConversations onItemClick={handleOnItemClick} listItemStyle={listItemStyle} avatarStyle={avatarStyle} title='' titleAlignment={TitleAlignment.center} conversationsStyle={conversationsStyle} />
          </Box>
          <Box w={'70%'} h={'100%'}>
            {chatUser && <CometChatMessages messagesStyle={messagesStyle} user={chatUser} />}
          </Box>
        </HStack>
      </VStack>
    </Box>
  )
}

export default MessageAdmin
