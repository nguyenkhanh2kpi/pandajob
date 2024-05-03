import { Avatar, Box, Button, Center, HStack, Heading, Image, SlideFade, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { ConversationsStyle, MessagesStyle, UIKitSettingsBuilder } from '@cometchat/uikit-shared'
import { AvatarStyle, BackdropStyle, BadgeStyle, CometChatConversations, CometChatMessages, CometChatUIKit, ListItemStyle, TitleAlignment } from '@cometchat/chat-uikit-react'
import { CometChatUsersWithMessages } from '@cometchat/chat-uikit-react'
import { ConversationsRequestBuilder } from '@cometchat/chat-sdk-javascript'
import { useEffect, useState } from 'react'
import { CometChat } from '@cometchat/chat-sdk-javascript'
import { cometChatService } from '../../Service/cometchat.service'
const conversationsStyle = new ConversationsStyle({
  width: '100%',
  height: '100%',
  fontFamily: 'Montserrat',
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

const COMETCHAT_CONSTANTS = {
  APP_ID: '25621446d429b454',
  REGION: 'us',
  AUTH_KEY: '1de6a118d4d1a49b1ffb70d9b76a274fc9a330c9',
}
const UIKitSettings = new UIKitSettingsBuilder().setAppId(COMETCHAT_CONSTANTS.APP_ID).setRegion(COMETCHAT_CONSTANTS.REGION).setAuthKey(COMETCHAT_CONSTANTS.AUTH_KEY).subscribePresenceForFriends().build()
CometChatUIKit.init(UIKitSettings)
  .then(() => {
    console.log('Initialization completed successfully')
  })
  .catch(console.log)

const Message = () => {
  const data = JSON.parse(localStorage.getItem('data'))
  const [chatUser, setChatUser] = useState('')

  const handleOnItemClick = (item) => {
    CometChat.getUser(item.conversationWith.uid).then((user) => {
      setChatUser(user)
    })
  }

  const handleAddNewUser = (uid, username, avatar, email, phone) => {
    cometChatService
      .createNewUser(uid, username, avatar, email, phone)
      .then((reponse) => console.log('userBNN', reponse))
      .catch((er) => console.log(er))
  }

  useEffect(() => {
    CometChatUIKit.getLoggedinUser().then((user) => {
      if (!user) {
        CometChatUIKit.login(data.data.username)
          .then((user) => {
            console.log('Login Successful:', { user })
          })
          .catch((er) => {
            if (er.code === 'ERR_UID_NOT_FOUND') {
              handleAddNewUser(data.data.username, data.data.username, data.data.userInfo.avatar, data.data.email, data.data.userInfo.phone ? data.data.userInfo.phone : '0123456789')
            } else {
              console.log(er)
            }
          })
      } else {
      }
    })
  }, [])

  return (
    <Box mb={20} mt={120} fontFamily={'Montserrat'}>
      <Box h={600} display='flex' justifyContent='space-evenly'>
        <Box overflow={'hidden'} borderRadius={20} borderWidth={1} h={600} display='flex' w='75%' boxShadow={'lg'}>
          <HStack w={'100%'}>
            <Box h={'100%'} w={'30%'}>
              <CometChatConversations onItemClick={handleOnItemClick} listItemStyle={listItemStyle} avatarStyle={avatarStyle} title='Messages' titleAlignment={TitleAlignment.center} conversationsStyle={conversationsStyle} />
            </Box>
            <Box w={'70%'} h={'100%'}>
              {chatUser && <CometChatMessages messagesStyle={messagesStyle} user={chatUser} />}
            </Box>
          </HStack>
        </Box>
      </Box>
    </Box>
  )
}

export default Message
