import React, { Component } from 'react'
import { Switch, Route } from "react-router-dom";
import HomePage from "./components/HomePage"
import Dashboard from './components/Dashboard';



class App extends Component {
	render() {
		return (
			<>
				<Switch>
					<Route exact path='/' component={HomePage}></Route>
					<Route exact path='/dashboard' component={Dashboard}></Route>
				</Switch>
			</>
		);
	}
}
export default App;
