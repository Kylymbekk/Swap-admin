import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import {useNavigate} from 'react-router-dom'

function ListItems() {
  let navigate = useNavigate();

  return (
    <React.Fragment>
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon/>
        </ListItemIcon>
        <ListItemText primary="Админ"/>
      </ListItemButton>
      <ListItemButton onClick={() => navigate(`/send`)}>
        <ListItemIcon>
          <PeopleIcon/>
        </ListItemIcon>
        <ListItemText primary="Пополнить баланс"/>
      </ListItemButton>
      <ListItemButton onClick={() => navigate(`/well`)}>
        <ListItemIcon>
          <BarChartIcon/>
        </ListItemIcon>
        <ListItemText primary='Курс'/>
      </ListItemButton>
    </React.Fragment>
  );
}

export default ListItems

