import { useState } from 'react';
import { Container, Paper, Avatar, TextField, Button, Typography, makeStyles } from '@material-ui/core';
import LockIcon from '@material-ui/icons/LockOutlined';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../../store/actions/userActions';

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

const Login = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { error, errorMsg } = useSelector(state => state.user);


  return(
    <Container maxWidth='sm'>
      {
        error &&
        <Paper variant='elevation' elevation={3} className={classes.paper} style={{backgroundColor: '#FF9494'}}>
        {errorMsg}
        </Paper>
      }
      <Paper variant='elevation' elevation={3} className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockIcon/>
        </Avatar>
        <Typography component='h1' variant='h5'>
          Log in
        </Typography>
        <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="username"
            label="Username"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        <Button
          fullWidth
          variant='contained'
          color='primary'
          className={classes.submit}
          disabled={!username || !password}
          onClick={() => {
            dispatch(loginUser({
              username,
              password
            }))
          }}
        >
          Log in
        </Button>
        <Button
          fullWidth
          variant='contained'
          color='secondary'
          className={classes.submit}
          onClick={() => history.push('/register')}
        >
          Register
        </Button>
      </Paper>
    </Container>
  )
}

export default Login