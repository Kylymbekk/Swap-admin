import React, {useState, useEffect, useContext} from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import {InputAdornment, InputLabel, OutlinedInput} from '@mui/material'
import Button from '@mui/material/Button'
import axios from 'axios'
import {Context} from '../App'

function Well() {
  const [well$, setWell$] = useState('')
  const [prevwell$, setPrevWell$] = useState('')
  const [well$T, setWell$T] = useState('')
  const [prevwell$T, setPrevWell$T] = useState('')
  const [commission, setCommission] = useState('')
  const [prevcommission, setPrevCommission] = useState('')
  const context = useContext(Context)

  useEffect(() => {
    well()
  }, [])

  const well = () => {
    axios.get('http://192.168.0.101:5002/api/v1/exchange', {
      headers: {
        'Authorization': `Bearer ${context.token}`,
      }
    })
      .then((data) => {
        setPrevWell$(data.data.payload.rate_usd)
        setPrevWell$T(data.data.payload.rate_usdt)
        setPrevCommission(data.data.payload.commission)
        console.log(data)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const ChangeWell = () => {
    axios.post('http://192.168.0.101:5002/api/v1/admin/rate', {
      usd: well$,
      usdt: well$T,
      commission: commission,
    }, {
      headers: {
        'Authorization': `Bearer ${context.token}`,
      }
    }).then((response) => {
      alert(`Ваш курс менял 1 USD = ${well$} , 1 USDT = ${well$T} , коммисия = ${commission} %`)
      console.log(response)
    }).catch(e => {
      console.log(e)
    })
  }

  return (
    <>
      <Typography variant="h4" component="h1" align={'center'} sx={{marginTop: 5}}>
        Изменить курс
      </Typography>
      <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Box
          sx={{
            width: 500,
            backgroundColor: '#272B34',
            height: '100%',
            marginTop: 2,
            padding: 1
          }}
        >
          <InputLabel htmlFor="outlined-adornment-amount" sx={{marginTop: 3, color: 'white'}}>Веедите курс</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            value={well$}
            sx={{backgroundColor: 'white', marginTop: 1, width: 500}}
            onChange={event => setWell$(event.target.value)}
            startAdornment={<InputAdornment position="start">Курс 1$ = {prevwell$} :</InputAdornment>}
            label="Amount"
          />
          <InputLabel htmlFor="outlined-adornment-amount" sx={{marginTop: 5, color: 'white'}}>Веедите курс</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            value={well$T}
            sx={{backgroundColor: 'white', marginTop: 1, width: 500}}
            onChange={event => setWell$T(event.target.value)}
            startAdornment={<InputAdornment position="start">Курс 1$T = {prevwell$T} :</InputAdornment>}
            label="Amount"
          />
          <InputLabel htmlFor="outlined-adornment-amount" sx={{marginTop: 3, color: 'white'}}>Веедите коммисии</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            value={commission}
            sx={{backgroundColor: 'white', marginTop: 1, width: 500}}
            onChange={event => setCommission(event.target.value)}
            startAdornment={<InputAdornment position="start">Коммисия {prevcommission} % :</InputAdornment>}
            label="Amount"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color={'info'}
            onClick={() => ChangeWell()}
            sx={{ mt: 4, mb: 2}}
          >
            Изменить
          </Button>
        </Box>
      </Box>
    </>
  )
}

export default Well
