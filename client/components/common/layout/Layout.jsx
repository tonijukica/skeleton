import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import { ThemeProvider } from '@material-ui/core';
import theme from './theme';

const Layout = ({ children }) => (
	<div style={{position: 'relative'}}>
		<ThemeProvider theme={theme}>
			<Header />
			<Main>{children}</Main>
			<Footer />
		</ThemeProvider>
	</div>
);

export default Layout;