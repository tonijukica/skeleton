import { Container, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() =>({
		container: {
			paddingBottom: '16px',
			paddingTop: '16px',
      minHeight: '1000px',
      position: 'relative'
		},
  })
);

const Main = ({ children }) => {
	const classes = useStyles();
	return (
		<Container maxWidth='xl' className={classes.container}>
			{children}
		</Container>
	);
};
export default Main;