import * as React from 'react';
import Typography from '@mui/material/Typography';
import NotificationsIcon from '@mui/icons-material/Notifications'
import {useEffect, useState, useContext} from 'react'
import axios from 'axios'
import {Context} from '../App'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CheckIcon from '@mui/icons-material/Check';

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');
  const [applications, setApplications] = useState([])
  const context = useContext(Context)


  useEffect(() => {
    all_applications()
  }, [])

  const all_applications = () => {
    axios.get('http://192.168.0.101:5002/api/v1/admin/transfer', {
      headers: {
        'Authorization': `Bearer ${context.token}`,
      }
    })
      .then((data) => {
        setApplications(data.data.payload.list)
        console.log(data)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const send = (id) => {
    const conf = window.confirm(`Вы уверен`);
    if (conf) {
      axios.post('http://192.168.0.101:5002/api/v1/admin/transfer/complete', {
        id: id
      }, {
        headers: {
          'Authorization': `Bearer ${context.token}`,
        }
      }).then((response) => {
        alert(`успешно пополнен`)
        console.log(response)
        setApplications(p => p.filter((item) => {
          return item.id !== id
        }))
      }).catch(e => {
        console.log(e)
      })
    } else {
      alert(`счет не пополнен`)
    }
  }

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <div>
      <NotificationsIcon onClick={handleClickOpen('paper')}/>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        sx={{padding: 10}}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">
          <Typography align={'center'} id="modal-modal-title" variant="h6" component="h2">
          Все завявки {applications.length}
          </Typography>
        </DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            {applications.map((item) => {
                    return (
                      <div key={item.id}>
                        <Typography id="modal-modal-description" align={'center'} sx={{ mt: 2, mb: 2, }}>
                          {item.to} {item.requisite} {item.sum} - сом
                          <Button><CheckIcon fontSize={'small'} onClick={() => send(item.id)} /></Button>
                        </Typography>
                      </div>
                    )
            })}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Закрыть</Button>
        </DialogActions>
      </Dialog>
    </div>
    // <div>
    //   <Modal
    //     open={open}
    //     onClose={handleClose}
    //     aria-labelledby="modal-modal-title"
    //     aria-describedby="modal-modal-description"
    //   >
    //     <Box sx={style}>
    //
    //     </Box>
    //   </Modal>
    // </div>
  );
}
