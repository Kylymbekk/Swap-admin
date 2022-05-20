import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import {useEffect, useState, useContext} from 'react'
import Button from '@mui/material/Button'
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import {Context} from '../App'

export default function Orders() {
  const [users, setUsers] = useState([])
  const [prevwell$, setPrevWell$] = useState('')
  const [prevwell$T, setPrevWell$T] = useState('')
  const [commission, setCommission] = useState('')
  let navigate = useNavigate();
  const context = useContext(Context)

  useEffect(() => {
    well()
    all_user()
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
        setCommission(data.data.payload.commission)
        console.log(data)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const all_user = () => {
    axios.get('http://192.168.0.101:5002/api/v1/admin/user', {
      headers: {
        'Authorization': `Bearer ${context.token}`,
      }
    })
      .then((data) => {
        console.log(data)
        setUsers(data.data.payload.list)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  return (
    <React.Fragment>
      <Title>Все ползователи {users.length}</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell align="center">Эл. адресь и Номер телефон</TableCell>
            <TableCell align="center">
              Коммисия
              <Button onClick={() => navigate(`/well`)}><CurrencyExchangeOutlinedIcon /></Button>
            </TableCell>
            <TableCell align="center">
              Курс $
              <Button onClick={() => navigate(`/well`)}><CurrencyExchangeOutlinedIcon /></Button>
            </TableCell>
            <TableCell align="center">
              Курс $T
              <Button onClick={() => navigate(`/well`)}><CurrencyExchangeOutlinedIcon /></Button>
            </TableCell>
            <TableCell align="center">
              Баланс $
              <Button onClick={() => navigate(`/send`)}><AddOutlinedIcon /></Button>
            </TableCell>
            <TableCell align="center">
              Баланс $T
              <Button onClick={() => navigate(`/send`)}><AddOutlinedIcon /></Button>
            </TableCell>
            <TableCell align="center">
              Баланс Сом
              <Button onClick={() => navigate(`/send`)}><AddOutlinedIcon /></Button>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.length > 0 ? users.map((users) => (
            <TableRow key={users.id}>
              <TableCell align={'center'}>{users.email}{users.phone_number}</TableCell>
              <TableCell align={'center'}>{commission} %</TableCell>
              <TableCell align="center">
                <input
                  disabled={true}
                  style={{width: 60}}
                  value={prevwell$}
                />
              </TableCell>
              <TableCell align="center">
                <input
                  disabled={true}
                  style={{width: 60}}
                  value={prevwell$T}
                />
              </TableCell>
              <TableCell align="center">
                <input
                  value={users.balance_usd}
                  style={{width: 120}}
                  disabled={true}
                />
              </TableCell>
              <TableCell align="center">
                <input
                  value={users.balance_usdt}
                  disabled={true}
                  style={{width: 120}}
                />
              </TableCell>
              <TableCell align="center">
                <input
                  value={users.balance_kgs}
                  disabled={true}
                  style={{width: 120}}
                />
              </TableCell>
            </TableRow>
          )): null}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
