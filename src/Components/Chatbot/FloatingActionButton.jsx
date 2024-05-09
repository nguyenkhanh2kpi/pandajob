import React from 'react'
import './FloatingActionButton.css'
import { BsChatText } from 'react-icons/bs'

const FloatingActionButton = ({ onClick }) => {
  return (
    <button className='floating-button' onClick={onClick}>
      <BsChatText className='icon' />
    </button>
  )
}

export default FloatingActionButton
