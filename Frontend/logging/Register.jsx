import React from 'react';
import { Redirect, Link } from 'react-router-dom'

class Register extends React.Component {
	constructor() {
		super();
		this.state = {
			fields: {
				"username": "",
				"password": "",
			},
			errors: {}
		}
		this.handleChange = this.handleChange.bind(this);
		this.submituserRegistrationForm = this.submituserRegistrationForm.bind(this);
	};

	componentWillReceiveProps(nextProps) {
		if (nextProps.status.registration === "failed") {
			alert("This username has already been used, please try again.")
		}
	}
	validateForm() {
		let fields = this.state.fields;
		let errors = {};
		let formIsValid = true;

		if (!fields["username"]) {
			formIsValid = false;
			errors["username"] = "* Please enter your username.";
		}
		if (!fields["password"]) {
			formIsValid = false;
			errors["password"] = "* Please enter your password.";
		}

		if (fields["username"]) {
			if (!fields["username"].match(/^.*(?=.{5,}).*$/)) {
				formIsValid = false;
				errors["username"] = "INVALID USERNAME: Your username must have at least 5 characters";
			}
		}
		if (fields["password"]) {
			if (!fields["password"].match(/^.*(?=.{6,})(?=.*[a-z])(?=.*[A-Z]).*$/)) {
				formIsValid = false;
				errors["password"] = "INVALID PASSWORD: Your password must have at least 6 characters and contain a mix of lowercase (a-z) and uppercase letters (A-Z).";
			}
		}
		this.setState({
			errors: errors
		});
		return formIsValid;
	}

	handleChange(e) {
		let fields = this.state.fields;
		fields[e.target.name] = e.target.value;
		this.setState({fields});
	}

	submituserRegistrationForm(e) {
		e.preventDefault();
		if (this.validateForm()) {
			let fields = {};
			fields["username"] = "";
			fields["password"] = "";
			this.setState({ fields: fields });
			this.props.register({ username: this.state.fields.username, password: this.state.fields.password })
		}
	}

	
	render() {
		if (this.props.status.registration === "successful") {
			alert('Register successfully! Please log in.')
			return (<Redirect to="/login" />)
		}
		else {
			return (
				<div id="login-page">
					<div class="container">
						<div class="row">
							<div class="col-sm-8"></div>
							<div class="col-sm-4">
								<div class="card">
									<div class="card-body">
									<h2>REGISTER</h2>
									<h6 style={{ color: "grey" }}>Please enter your username and password. </h6>
									<br />

									<form method="post" onSubmit={this.submituserRegistrationForm} >
										<label for="username"><b>Username</b></label>
										<input class="form-control" type="text" name="username" value={this.state.fields.username} onChange={this.handleChange.bind(this)} autoFocus />
										<div class="errorMsg" style={myStyle.error}>{this.state.errors.username}</div>

										<label for="password"><b>Password</b></label>
										<input class="form-control" type="password" name="password" value={this.state.fields.password} onChange={this.handleChange.bind(this)} />
										<div class="errorMsg" style={myStyle.error}>{this.state.errors.password}</div>
										<br />
										<br />
										<input type="submit" class="button btn-outline-info form-control" value="Register" />
										

									</form>
									</div>
									<div class="card-footer">
                                            <h6>Already have an account? <Link to="/login">Log in</Link></h6>
                                        </div>
								</div>
							</div>
						</div>

						<div id="homebtn" >
							<Link to="/" >
								<button type="button" class="btn" style={myStyle.btnhome}><i class="fa fa-home"></i></button>
							</Link>
						</div>
					</div>
				</div>

			);
		}

	}

}

const myStyle = {
	btnhome: {
		backgroundColor: '#C4B578',
		fontSize: '20px',
	},
	error:{
		color: '#AD4945',
    }
}
export default Register;