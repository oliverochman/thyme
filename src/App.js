import React, { Component } from 'react'
import Menubar from './components/Menubar'
import LoginForm from './components/LoginForm'
import { authenticate } from './Modules/Auth';
// import { authenticate } from './Modules/Auth';

class App extends Component {
	constructor(props) {
		super(props)

		this.state = {
			username: '',
			password: '',
			authenticated: false
		};
	};

	onChange(event) {
		this.setState({
			[event.target.id]: event.target.value
		})
	}

	async onLogin(e) {
		e.preventDefault();
		const response = await authenticate(this.state.username, this.state.password)
		debugger;
		if (response.authenticated === true) {
			this.setState({authenticated: true})
		} else {
			console.log(response)
		}
  }

	render() {
		let loginFormOrWelcomeMessage;

		if (this.state.authenticated === true) {
			const user = JSON.parse(sessionStorage.current_user).username
			loginFormOrWelcomeMessage = (
				<p id="login_message">
					Welcome {user}
				</p>
			)
		} else {
			loginFormOrWelcomeMessage = (
				<LoginForm
					inputChangeHandler={this.onChange.bind(this)}
					clickLogin={this.onLogin.bind(this)}
				/>
			)
		}

		return (
			<div style={{ overflow: 'hidden' }}>
				<div style={{ float: 'left', width: '400px' }}>
					<Menubar />
				</div>
				<div style={{ float: 'right', width: '600px' }}>
					{loginFormOrWelcomeMessage}
				</div>
			</div>
		)
	}
}

export default App;
