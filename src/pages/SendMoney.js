import React, {useState, useContext} from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography'
import {Chip, InputAdornment, InputLabel, OutlinedInput, Stack} from '@mui/material'
import Button from '@mui/material/Button'
import axios from 'axios'
import {Context} from '../App'

function SendMoney() {
  const [search_user_email, setSearch_user] = useState('')
  const [search_user_phone, setSearch_user_phone] = useState('')
  const [user, setUser] = useState({})
  const [price$, setPrice$] = useState('')
  const [price$T, setPrice$T] = useState('')
  const context = useContext(Context)

  const search = () => {
    axios.get('http://192.168.0.101:5002/api/v1/admin/user', {
      headers: {
        'Authorization': `Bearer ${context.token}`,
      },
      params: {
        email: search_user_email,
        phone_number: search_user_phone
      }
    })
      .then((data) => {
        setUser(data.data.payload.user)
        setSearch_user('')
        setSearch_user_phone('')
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const addMoney = () => {
    axios.post('http://192.168.0.101:5002/api/v1/admin/user/replenish', {
      currency: price$ > 0 ? 'usd' : 'usdt',
      amount: price$ > 0 ? price$ : price$T,
      user_id: user.id
    }, {
      headers: {
        'Authorization': `Bearer ${context.token}`,
      }
    }).then((response) => {
      alert(`успешно пополнен`)
      setUser(response.data.payload.user)
      setPrice$('')
      setPrice$T('')
      console.log(response)
    }).catch(e => {
      console.log(e)
    })
  }

  return (
    <>
      <Typography variant="h4" component="h1" align={'center'} sx={{marginTop: 2}}>
        Пополнения баланса
      </Typography>
      <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Box
          sx={{
            backgroundColor: '#272B34',
            width: 500,
            height: '100%',
            marginTop: 2,
            padding: 1
          }}
        >
          <Paper
            component="div"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 490, marginTop: 2}}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              value={search_user_email}
              disabled={search_user_phone}
              onChange={event => setSearch_user(event.target.value)}
              placeholder="Поиск ползователя по email"
            />
            <IconButton
              type="submit"
              sx={{ p: '10px' }}
              aria-label="search"
              onClick={() => search()}
            >
              <SearchIcon />
            </IconButton>
          </Paper>
          <Paper
            component="div"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 490, marginTop: 3}}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              value={search_user_phone}
              disabled={search_user_email}
              onChange={event => setSearch_user_phone(event.target.value)}
              placeholder="Поиск по номер телефона начиная +996"
            />
            <IconButton
              type="submit"
              sx={{ p: '10px' }}
              aria-label="search"
              onClick={() => search()}
            >
              <SearchIcon />
            </IconButton>
          </Paper>
          {Object.values(user).length > 0
            ? <>
                <Stack direction="row" spacing={1} sx={{mt: 2}}>
                  <Chip label={`${user.email ? user.email : user.phone_number}`} sx={{width: 800, height: 40}} color="info" />
                </Stack>
                <Stack direction={`row`} spacing={1} sx={{mt: 2}}>
                  <Chip label={`${user.balance_usd} $`} sx={{width: 170, height: 30}} color="info" />
                  <Chip label={`${user.balance_usdt} $T`} sx={{width: 170, height: 30}} color="info" />
                  <Chip label={`${user.balance_kgs} Сом`} sx={{width: 170, height: 30}} color="info" />
                </Stack>
              </>
            : null
          }
          <InputLabel htmlFor="outlined-adornment-amount" sx={{marginTop: 2, color: 'white'}}>Веедите сумму</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            value={price$}
            disabled={price$T}
            sx={{backgroundColor: 'white', marginTop: 1, width: 500}}
            onChange={event => setPrice$(event.target.value)}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Amount"
          />
          <InputLabel htmlFor="outlined-adornment-amount" sx={{marginTop: 2, color: 'white'}}>Веедите сумму</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            value={price$T}
            disabled={price$}
            sx={{backgroundColor: 'white', marginTop: 1, width: 500}}
            onChange={event => setPrice$T(event.target.value)}
            startAdornment={<InputAdornment position="start">$T</InputAdornment>}
            label="Amount"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color={'info'}
            onClick={() => addMoney()}
            sx={{ mt: 3, mb: 2}}
          >
            Пополнить
          </Button>
        </Box>
      </Box>
    </>
  )
}

export default SendMoney
