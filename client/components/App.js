import React from 'react';
import './App.css';
import { hot } from 'react-hot-loader';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import  PrivateRoute  from './common/PrivateRoute';
import Login from './auth/login/Login';
import Register from './auth/register/Register';
import Profile from './profile/Profile';
import Layout from '../components/common/layout/Layout';

function App() {
	return (
		<Router>
			<Layout>
				<Switch>
					<Route path='/register' component={Register}/>
					<Route path='/login' component={Login}/>
					<PrivateRoute path='/profile' component={Profile}/>
				</Switch>
			</Layout>
		</Router>
	);
}

export default hot(module)(App);
