import { Container, Paper, Avatar, TextField, Button, Typography, makeStyles } from '@material-ui/core';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

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

const Register = () => {
  const classes = useStyles();

  return(
    <Container maxWidth='sm'>
      <Paper variant='elevated' elevation={3} className={classes.paper}>
        <Avatar className={classes.avatar}>
          <VpnKeyIcon/>
        </Avatar>
        <Typography component='h1' variant='h5'>
          Register
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
            name="email"
            label="Email"
            id="email"
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
          Register
        </Button>
      </Paper>
    </Container>
  )
}

export default Register