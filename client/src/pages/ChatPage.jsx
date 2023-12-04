import React, { useState, useEffect } from 'react'
import { ChatState } from '../Context/ChatProvider'
import { Box } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import SideDrawer from '../components/shared/SideDrawer'
import MyChats from '../components/shared/MyChats'
import ChatBox from '../components/shared/ChatBox'

const ChatPage = () => {
  const { user, setUser } = ChatState()
  const [fetchAgain, setFetchAgain] = useState(false);
  const history = useNavigate()

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    setUser(userInfo)

    if (!userInfo) history('/')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history])

  return (
    <>
      <div style={{ width: '100%' }}>
        {user && <SideDrawer />}
        <Box
          display='flex'
          justifyContent='space-between'
          w='100%'
          h='91.5vh'
          p='10px'
        >
          {user && <MyChats fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
          {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
        </Box>
      </div>
    </>
  )
}

export default ChatPage
