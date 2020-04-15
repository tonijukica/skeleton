import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../../store/actions/userActions';



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Header = () => {
  const classes = useStyles();
  const history = useHistory();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { username } = useSelector(state => state.user);

  const handleLoginRedirect = () => {
    history.push('/login');
  }
  const handleLogout = () => {
    dispatch(logoutUser());
  }
  
  if(pathname !== '/login' && pathname !== '/register')
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              App
            </Typography>
            {
              username ? 
                <>
                  <Button color="inherit" onClick = {() => history.push('/profile')}>{username}</Button>
                  <Button color="inherit" onClick = {handleLogout}>Logout</Button>
                </>
              :
              <Button color="inherit" onClick = {handleLoginRedirect}>Login</Button>
            }
          </Toolbar>
        </AppBar>
      </div>
    );
  else
    return(
      <>
      </>
    )
}

export default Header;