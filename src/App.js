import React, { Component } from 'react'
import { Switch, Route } from "react-router-dom";
import HomePage from "./components/HomePage"
import Menubar from "./components/Menubar"



class App extends Component {
	render() {
		return (
			<>
				<Switch>
					<Route exact path='/' component={HomePage}></Route>
				</Switch>
			</>
		);
	}
}
export default App;
