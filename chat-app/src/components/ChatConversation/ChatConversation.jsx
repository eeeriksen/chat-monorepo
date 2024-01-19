import React, { useRef, useState, useEffect, useContext } from 'react'
import { SocketContext } from '@/contexts/SocketContext'
import { UsersContext } from '@/contexts/UsersContext'
import css from './chatConversation.module.css'

export const ChatConversation = () => {
  const messageInput = useRef(null)
  const conversationContainer = useRef(null)
  const conversationElement = useRef(null)

  const [message, setMessage] = useState('')
  const [conversation, setConversation] = useState([])
  const [containerHeight, setContainerHeight] = useState(0)

  const { Socket } = useContext(SocketContext)
  const { state: { username } } = useContext(UsersContext)

  const sendMessage = () => {
    if (message !== '') {
      Socket.emit('sendMessage', { username, message, room: 'main' })
      setMessage('')
    }
  }

  const enter = (e) => {
    if (e.keyCode === 13) {
      sendMessage()
    }
  }

  useEffect(() => {
    Socket.on('updateConversation', chatItem => {
      setConversation(conv => [...conv, chatItem])
    })
  }, [Socket])

  useEffect(() => {
    messageInput.current.focus()

    const observer = new ResizeObserver(entries => {
      conversationContainer.current.scrollTo(0, conversationContainer.current.scrollHeight)
    })
    observer.observe(conversationElement.current)
  }, [])

  return (
    <section className={css.section}>
      <div ref={conversationContainer} className={css.conversationContainer}>
        <div ref={conversationElement} className={css.conversation}>
          {
            conversation.map((item, i) => (
              <div className={`${username === item.username ? css.self : css.other} ${css.messageChat}`} key={i}>
                <p className={css.usernameMessage}>{item.username}</p>
                <p className={css.messageContent}>{item.message}</p>
              </div>
            ))
          }
        </div>
      </div>
      <div className={css.messageInputContainer}>
        <input
          ref={messageInput}
          className={css.input}
          autoComplete="off"
          id="message"
          value={message}
          onKeyUp={(e) => enter(e)}
          placeholder="Your message..."
          onChange={(e) => setMessage(e.target.value)}
          type="text"
        />
        <button
          type='button'
          className={css.button}
          onClick={sendMessage}
        >&#9658;</button>
      </div>
    </section>
  )
}
