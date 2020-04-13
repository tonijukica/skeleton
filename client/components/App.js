import React from 'react';
import './App.css';
import { hot } from 'react-hot-loader';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import  PrivateRoute  from './common/PrivateRoute';
import Login from './login/Login';
import Register from './register/Register';
import Profile from './profile/Profile';

function App() {
	return (
		<Router>
			<div className='App'>
				<header className='App-header'>
					This is the App
					<nav>
						<li>
							<Link to='/'>Home</Link>
						</li>
						<li>
							<Link to='/register'>Register</Link>
						</li>
						<li>
							<Link to='/login'>Login</Link>
						</li>
						<li>
							<Link to='/profile'>Profile</Link>
						</li>
					</nav>
				<Switch>
					<Route path='/register' component={Register}/>
					<Route path='/login' component={Login}/>
					<PrivateRoute path='/profile' component={Profile}/>
				</Switch>
				</header>
			</div>
		</Router>
	);
}

export default hot(module)(App);
