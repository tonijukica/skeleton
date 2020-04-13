import { Container, Paper, Avatar, TextField, Button, Typography, makeStyles } from '@material-ui/core';
import LockIcon from '@material-ui/icons/LockOutlined';
import { useHistory } from 'react-router-dom';

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

  return(
    <Container maxWidth='sm'>
      <Paper variant='elevated' elevation={3} className={classes.paper}>
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
          />
        <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
          />
        <Button
          fullWidth
          variant='contained'
          color='primary'
          className={classes.submit}
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