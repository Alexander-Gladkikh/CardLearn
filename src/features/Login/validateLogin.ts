import * as Yup from 'yup'

export const validateLogin = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Required field'),
  password: Yup.string().min(7, 'Password must be at least 7 characters').required('Required field'),
})
