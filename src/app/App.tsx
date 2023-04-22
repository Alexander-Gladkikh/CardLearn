import React, { useEffect } from 'react'

import CircularProgress from '@mui/material/CircularProgress/CircularProgress'

import { initializeAppTC } from 'app/app-reducer'
import s from 'app/App.module.scss'
import { selectIsAppInitialized } from 'app/appSelectors'
import { useAppDispatch, useAppSelector } from 'app/store'
import { BackDrop } from 'common/components/BackDrop/BackDrop'
import { Header } from 'common/components/Header/Header'
import { RoutesPage } from 'common/components/RoutesPage/RoutesPage'
import { SnackBar } from 'common/components/SnackBar/SnackBar'

export const App = () => {
  const isInitialized = useAppSelector<boolean>(selectIsAppInitialized)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initializeAppTC())
  }, [])

  if (!isInitialized) {
    return (
      <div className={s.initialized}>
        <CircularProgress color="primary" />
      </div>
    )
  }

  return (
    <div className={s.App}>
      <BackDrop />
      <Header />
      <RoutesPage />
      <SnackBar />
    </div>
  )
}
