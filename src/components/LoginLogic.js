import React, { Component } from 'react'
import LoginForm from './LoginForm'
import { authenticate } from '../modules/Auth'
class LoginLogic extends Component {
		state = {
			errorMessage: '',
			username: '',
			password: '',
		}

	onChange(event) {
		this.setState({
			[event.target.id]: event.target.value
		})
	}

	async onLogin(e) {
		e.preventDefault();
		const response = await authenticate(this.state.username, this.state.password)
		if (response.authenticated === true) {
			this.props.userAuthenticated()
		} else {
			this.setState({ errorMessage: 'Invalid credentials' })
		}
	}

	render() {
		return (
			<>
				<p id="error_message" style={{ fontSize: '20px', position: 'fixed', right: '43.7%', color: 'white', top: '480px' }}>
					{this.state.errorMessage}
				</p>

				<LoginForm
					inputChangeHandler={this.onChange.bind(this)}
					clickLogin={this.onLogin.bind(this)}
				/>
			</>
		)
	}
}

export default LoginLogic;
