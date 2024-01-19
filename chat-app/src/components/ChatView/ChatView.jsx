import React, { useContext, useEffect, useRef, useState } from 'react'
import css from './chatview.module.css'
import { ChatConversation } from '@components/ChatConversation/ChatConversation'
import { ConnectedUsers } from '@/components/ConnectedUsers/ConnectedUsers'
import { UsersContext } from '@/contexts/UsersContext'
import { SocketContext } from '@/contexts/SocketContext'

export const ChatView = () => {
  const { state: { username } } = useContext(UsersContext)
  const { Socket } = useContext(SocketContext)
  const [innerWidth, setinnerWidth] = useState(null)

  useEffect(() => {
    Socket.emit('joinRoom', { username, room: 'main' })

    function resizeWindow(event) {
      setinnerWidth(window.innerWidth)
    }

    window.addEventListener("resize", resizeWindow)
    resizeWindow()

    return () => window.removeEventListener("resize", resizeWindow)
  }, [])

  return (
    <main className={css.main}>
      {innerWidth > 799 && <ConnectedUsers />}
      <ChatConversation />
    </main>
  )
}
