import * as Yup from 'yup'

export const validateRegister = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().min(7, 'Password must be at least 7 characters').required('Required'),
  confirmPassword: Yup.string()
    .required('Required')
    .oneOf([Yup.ref('password')], 'Passwords must match'),
})
