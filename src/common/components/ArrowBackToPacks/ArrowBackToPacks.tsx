import React from 'react'

import { useNavigate } from 'react-router-dom'

import s from './ArrowBackToPacks.module.scss'

import vector from 'assets/images/vector.svg'
import { PATH } from 'common/path/path'

export const ArrowBackToPacks = () => {
  const navigate = useNavigate()

  const onClickHandler = () => {
    navigate(PATH.PACKS.PACKS)
  }

  return (
    <div className={s.arrow} onClick={onClickHandler}>
      <img src={vector} alt="vector icon" />
      <span>Back to Packs List</span>
    </div>
  )
}
