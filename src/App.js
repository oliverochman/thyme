import React, { Component } from 'react'
import Menubar from './components/Menubar'
import LoginLogic from './components/LoginLogic'
class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			authenticated: false,
		}
	}

	userAuthenticated() {
		this.setState({ authenticated: true })
	}

	isUserAuthenticated() {
		if (this.state.authenticated === true) {
			const user = JSON.parse(sessionStorage.current_user).username
			return (
			<div style={{ overflow: 'hidden' }}>
				<div style={{ float: 'left', width: '400px' }}>
					<Menubar />
				</div>
				<div style={{ float: 'right', width: '600px' }}>
					<p id="login_message">
						Welcome, {user}
					</p>
				</div>
			</div>
			)
		} else {
			return (
				<LoginLogic
					userAuthenticated={this.userAuthenticated.bind(this)}
					authenticated={this.state.authenticated}
				/>
			)

		}
	}

	render() {
		return (
			<>
				{this.isUserAuthenticated()}
			</>
		)
	}
}

export default App;
