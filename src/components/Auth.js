import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import {useContext, useState} from 'react'
import axios from 'axios'
import {VERIFICATION_CODE_LENGTH} from '../app/settings'
import {Context} from '../App'

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Swap © '}
      <Link color="inherit" href="https://mui.com/">
        Your Admin
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [verification_code, setVerification_code] = useState('')
  let navigate = useNavigate();
  const context = useContext(Context)

  const SignUser = () => {
    axios.post('http://192.168.0.102:5002/api/v1/auth/admin/sign-in', {
      email: email,
      password: password
    }).then((response) => {
      context.setToken(response.data.payload.token)
      context.setUser(response.data.payload.user)
    }).catch(e => {
      if (e?.response?.data?.status === 'admin_not_found') {
        alert('Ошибка!', 'Admin не найден!')
      }
      else if (e?.response?.data?.status === 'wrong_password') {
        alert('Ошибка!', 'Неверный пароль!')
      }
      console.log(e)
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  const con_text = email.toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ) && password.length > 3 && password.length < 10 && verification_code.length === VERIFICATION_CODE_LENGTH

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Вход
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              value={email}
              onChange={event => setEmail(event.target.value)}
              label="Веедите эл.адрес"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              value={password}
              onChange={event => setPassword(event.target.value)}
              label="Пароль"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="verification_code"
              value={verification_code}
              onChange={event => setVerification_code(event.target.value)}
              label="Код"
              type="number"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Подтвердить"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={!con_text}
              onClick={() => SignUser()}
              sx={{ mt: 3, mb: 2 }}
            >
              Вход
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Забыли пароль
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Регистрация через сервера"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
