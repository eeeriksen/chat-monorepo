import React, { useContext, useState, useRef, useEffect } from 'react'
import { UsersContext } from '@/contexts/UsersContext'
import css from './welcome.module.css'

export const Welcome = () => {
  const { state: { username }, setUsername, setShowChat } = useContext(UsersContext)
  const [showAlert, setShowAlert] = useState(false)
  const usernameInput = useRef(null)

  const join = () => {
    if (username !== '') {
      setShowChat(true)
    } else {
      setShowAlert(true)
    }
  }

  const enter = (e) => {
    if (e.keyCode === 13)
      join()
  }

  useEffect(() => {
    usernameInput.current.focus()
  }, [])

  return (
    <main className={css.main}>
      <h3 className={css.h3}>Welcome!</h3>
      <label className={css.label} htmlFor="username">Username</label>
      <section className={css.section}>
        <input
          ref={usernameInput}
          className={css.input}
          id="username"
          autoComplete='off'
          value={username}
          onKeyUp={(e) => enter(e)}
          placeholder="Your username..."
          onChange={(e) => setUsername(e.target.value)}
          type="text"
        />
        <button type='button' className={css.button} onClick={join}>Join</button>
      </section>
      {showAlert && <p className={css.p}>Username is required</p>}
    </main >
  )
}
