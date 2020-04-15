import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import axios from 'axios';
import { format } from 'date-fns'
import { useState, useEffect } from 'react';
import { Container, Paper, Avatar, Typography, makeStyles, CircularProgress } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '16px'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  submit: {
    margin: theme.spacing(1, 0, 1),
  },
}));

const Profile = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    username: null,
    email: null,
    createdAt: null
  });

  useEffect(() => {
    axios.get('/api/profile')
    .then(({data}) => {
      const { username, email, createdAt } = data;
      setData({
        username,
        email,
        createdAt
      });
      setLoading(false)
    })
  }, [])

  return(
    <Container maxWidth='sm'>
      <Paper variant='elevation' elevation={3} className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AccountCircleIcon/>
        </Avatar>
        <Typography component='h1' variant='h4'>
          Profile
        </Typography>
        {loading && <CircularProgress color='primary' size='100px'/>}
        {!loading && 
          <>
            <Typography component='h1' variant='h6'>
              Username
            </Typography>
            <Typography variant='body1'>
              {data.username}
            </Typography>
            <Typography component='h1' variant='h6'>
              Email
            </Typography>
            <Typography variant='body1'>
              {data.email}
            </Typography>
            <Typography component='h1' variant='h6'>
              Registration date
            </Typography>
            <Typography variant='body1'>
              {format(new Date(data.createdAt), 'dd/MM/yyyy')}
            </Typography>
          </>
        }
      </Paper>
    </Container>
  )
}

export default Profile