import React from 'react'

import { Paper, Typography } from '@mui/material'
import { Formik } from 'formik'
import { Navigate, NavLink } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from 'app/store'
import { RegisterData } from 'common/api/DataTypes'
import { PATH } from 'common/path/path'
import { registration } from 'features/Registration/registration-reducer'
import s from 'features/Registration/Registration.module.scss'
import RegistrationForm from 'features/Registration/RegistrationForm/RegistrationForm'
import { validateRegister } from 'features/Registration/validateRegistration'

const Registration = () => {
  const dispatch = useAppDispatch()
  const isRegistered = useAppSelector<boolean>(state => state.registration.isRegistered)

  const submitRegisterForm = ({ email, password }: RegisterData) => {
    dispatch(registration({ email, password }))
  }

  if (isRegistered) {
    return <Navigate to={PATH.LOGIN.LOGIN} />
  }

  return (
    <div>
      <Paper elevation={3} className={s.mainContainer}>
        <Typography className={s.title}>Sing Up</Typography>
        <Formik
          initialValues={{ email: '', password: '', confirmPassword: '' }}
          validationSchema={validateRegister}
          onSubmit={submitRegisterForm}
        >
          {formik => <RegistrationForm formik={formik} />}
        </Formik>

        <Typography className={s.optionalText}>Already have an account?</Typography>
        <NavLink to={PATH.LOGIN.LOGIN}>
          <div className={s.textLink}>Sign In</div>
        </NavLink>
      </Paper>
    </div>
  )
}

export default Registration
