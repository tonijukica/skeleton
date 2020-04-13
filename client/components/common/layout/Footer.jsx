import { Container, Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  footer: {
    borderTop: '1px solid #d1d5da !important',
    color: 'grey',
    height: '2.5rem',
    position: 'fixed',
    bottom: '0',
    textAlign: 'center'
  }
}));

const Footer = () => {
	const classes = useStyles();
	return (
		<Container maxWidth={false} className={classes.footer}>
			<Grid container direction='row' justify='center' alignItems='center'>
				<span>Toni Jukica 2020</span>
			</Grid>
		</Container>
	);
};

export default Footer;