import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Box } from '@mui/material'
import DoneIcon from '@mui/icons-material/Done'
import axios from 'axios'
import './styleLogin.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { hostName, webHost } from '../../global'
import { Button, ButtonGroup, CircularProgress, Image, Spinner } from '@chakra-ui/react'
import { IoEyeOutline } from 'react-icons/io5'
import { IoEyeOffOutline } from 'react-icons/io5'

const Login = () => {
  const [passShow, setPassShow] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const submitHandler = async (e) => {
    setLoading(true)
    e.preventDefault()
    if (email === '') {
      toast.error('email is required!', {
        position: 'top-center',
      })
    } else if (!email.includes('@')) {
      toast.warning('includes @ in your email!', {
        position: 'top-center',
      })
    } else if (password === '') {
      toast.error('password is required!', {
        position: 'top-center',
      })
    } else if (password.length < 3) {
      toast.error('password must be 4 char!', {
        position: 'top-center',
      })
    } else {
      try {
        const config = {
          headers: {
            'Content-type': 'application/json',
          },
        }
        setLoading(true)

        const { data } = await axios.post(
          `${hostName}/auth/login`,
          {
            email,
            password,
          },
          config
        )

        console.log('data', data)

        if (data.data !== null) {
          toast.success('User Login Successfuly', {
            position: 'top-center',
          })
          localStorage.setItem('data', JSON.stringify(data))
          localStorage.setItem('avatar', JSON.stringify(data.data.userInfo.avatar))
          console.log('user login succesfully done')
          setLoading(true)
          window.location.replace(`${webHost}`)
        } else {
          if (data.message === 'Your account is not activate!!!') {
            toast.error(data.message, {
              position: 'top-center',
            })
            const { data1 } = await axios.post(
              `${hostName}/auth/send-otp`,
              {
                email,
              },
              config
            )
            setTimeout(() => {
              navigate(`/verify/${email}`)
            }, 2000)
          } else {
            toast.error(data.message, {
              position: 'top-center',
            })
          }
        }
        setLoading(false)
      } catch (error) {
        setError(error.response.data.message)
        const FError = error.response.data.message
        console.log(FError)
        toast.error("something went wrong", {
          position: 'top-center',
        })
        setLoading(false)
      }
    }
  }
  return (
    <section className='login_section'>
      <Box mb={40} fontFamily={'Montserrat'} display={'flex'} mt={5}>
        <Box
          style={{
            backgroundImage: `url('https://static.vecteezy.com/system/resources/previews/007/559/359/non_2x/panda-an-illustration-of-a-panda-logo-climbing-a-bamboo-tree-free-vector.jpg')`,
          }}
          w='100%'
          alignItems={'center'}
          className='left_section'
          elevation={4}>
          <Link to='/signup' style={{ textDecoration: 'none' }}>
            <button variant='outlined' style={{ marginLeft: '10%', marginTop: '10%', fontSize: '20px' }}>
              Register For Free
            </button>
          </Link>
        </Box>
        <Box
          style={{
            backgroundImage: `url('https://cdn.dribbble.com/users/11310665/screenshots/19568845/panda_logo.png')`,
          }}
          className='form_data'>
          <div className='form_heading'>
            <p>Welcome Back, Log In</p>
          </div>
          <form>
            <div className='form_input'>
              <label htmlFor='email'>Email</label>
              <input style={{ borderRadius: '10px' }} type='email' value={email} onChange={(e) => setEmail(e.target.value)} name='email' id='email' placeholder='Enter Your email here ' />
            </div>
            <div className='form_input'>
              <label htmlFor='password'>Password</label>
              <div className='two'>
                <input style={{ borderRadius: '10px' }} type={!passShow ? 'password' : 'text'} value={password} onChange={(e) => setPassword(e.target.value)} name='password' id='password' placeholder='Enter Your password' />
                <div className='showpass' onClick={() => setPassShow(!passShow)}>
                  {!passShow ? <IoEyeOutline /> : <IoEyeOffOutline />}
                </div>
              </div>
            </div>
            <Button backgroundColor={'#87b2c4'} p={8} fontFamily={'Montserrat'} __hover={{ backgroundColor: '#ffffff' }} w={'100%'} borderRadius={10} onClick={submitHandler}>
              {loading ? (
                <>
                  <Spinner />
                </>
              ) : (
                <>Login</>
              )}
            </Button>

            <Link fontFamily={'Montserrat'} to={`/resetPassword`}>
              <button style={{ marginTop: '20px' }}>Quên tài khoản </button>
            </Link>
          </form>
          <ToastContainer />
        </Box>
      </Box>
    </section>
  )
}

export default Login
