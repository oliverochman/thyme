import React, { Component } from 'react'
import App from './App'
import Dashboard from './components/Dashboard'
import { Switch, Route } from "react-router-dom";

class Router extends Component {
	render() {
		return (
			<Switch>
				<Route exact path='/' component={App}></Route>
				<Route exact path='/dashboard' component={Dashboard}></Route>
			</Switch>
		)
	}
}

export default Router