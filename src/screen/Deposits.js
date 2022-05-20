import * as React from 'react';
import Typography from '@mui/material/Typography';
import Title from './Title';

export default function Deposits() {
  return (
    <React.Fragment>
      <Title >Все сумма </Title>
      <Typography color="text.secondary" align={'center'} sx={{ flex: 1, marginTop: 2,}}>
        3 Май, 2022
      </Typography>
      <Typography component="p" variant="h4" align={'center'} sx={{marginBottom: 6}}>
        $ 1000000
      </Typography>
    </React.Fragment>
  );
}
