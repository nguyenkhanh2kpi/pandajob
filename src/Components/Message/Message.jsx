import { Box, HStack, Heading, SlideFade, VStack } from '@chakra-ui/react'
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

const Message = () => {
  const data = JSON.parse(localStorage.getItem('data'))
  const [chatUser, setChatUser] = useState('')

  const handleOnItemClick = (item) => {
    CometChat.getUser(item.conversationWith.uid).then((user) => {
      setChatUser(user)
    })
  }

  return (
    <VStack bgColor={'#f0f4f5'} fontFamily={'Roboto'}>
      <SlideFade offsetY={20}>
        <Heading size={'lg'} m={'6'} mt={'65px'}></Heading>
      </SlideFade>

      <VStack h={600} bgColor={'white'} w={'100%'} overflow='hidden' align={'flex-start'}>
        <HStack h={600} alignItems={'flex-start'} w={'100%'}>
          <Box h={'100%'} w={'30%'}>
            <CometChatConversations onItemClick={handleOnItemClick} listItemStyle={listItemStyle} avatarStyle={avatarStyle} title='' titleAlignment={TitleAlignment.center} conversationsStyle={conversationsStyle} />
          </Box>
          <Box w={'70%'} h={'100%'}>
            {chatUser && <CometChatMessages messagesStyle={messagesStyle} user={chatUser} />}
          </Box>
        </HStack>
      </VStack>
    </VStack>
  )
}

export default Message
