import React, { useState } from 'react'

import AppBar from '@mui/material/AppBar'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'

import { useAppSelector } from 'app/store'
import flashLogo from 'assets/images/flash_logo.png'
import { AccountMenu } from 'common/components/Header/AccountMenu/AccountMenu'
import { PATH } from 'common/path/path'
import { common_button } from 'common/styles/LoginStyles'
import { selectIsLoggedIn } from 'features/Login/loginSelectors'
import { selectAvatar, selectName } from 'features/Profile/profileSelectors'

export const Header = () => {
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const name = useAppSelector<string>(selectName)
  const avatar = useAppSelector<string>(selectAvatar)
  const isLoggedIn = useAppSelector<boolean>(selectIsLoggedIn)
  const loginHandler = () => {
    navigate(PATH.LOGIN.LOGIN)
  }
  const clickHandler = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar sx={{ bgcolor: '#FCFCFC' }} position="fixed">
          <Container maxWidth="lg">
            <Toolbar>
              <Typography
                variant="h6"
                component="div"
                sx={{ display: 'flex', alignItems: 'center', gap: '10px', flexGrow: 1, color: 'black' }}
              >
                Flash Cards
                <Avatar sx={{ width: 40, height: 40 }} src={flashLogo} alt="Flash cards logo" />
              </Typography>
              {isLoggedIn ? (
                <Typography
                  component="div"
                  sx={{
                    color: 'black',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                  }}
                >
                  <span>{name}</span>
                  <Avatar
                    sx={{ width: 36, height: 36, cursor: 'pointer' }}
                    alt={name}
                    src={avatar}
                    sizes="small"
                    onClick={clickHandler}
                  />
                </Typography>
              ) : (
                <Button sx={common_button} variant="contained" onClick={loginHandler}>
                  Sign In
                </Button>
              )}
              <AccountMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
    </div>
  )
}
