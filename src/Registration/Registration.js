import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import './Registration.css';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
const url = require('../config.json').url;

class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            isEmpty: false,
            isDifferent: false,
            isError: false,
            onRegister: props.onRegister
        }

        this.register = this.register.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }


    async register(event) {
        if (!this.state.email || !this.state.password || !this.state.confirmPassword) {
            this.setState({
                isEmpty: true
            });
        }
        if (this.state.password !== this.state.confirmPassword) {
            this.setState({
                isDifferent: true
            });
        }
        event.preventDefault();
        if (!this.state.isEmpty && !this.state.isDifferent) {

            const response = await axios.post(`${url}/registration`, {
                email: this.state.email,
                password: this.state.password
            });
            console.log(response)
            if (response.data.error) {
                this.setState({isError: true});
                console.error(response.data.error);
            } else {
                this.setState({isError: false});
                this.props.history.push('/');
            }
        }
    }

    handleChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            [name]: value,
            isEmpty: false
        });
    }

    render() {
        return (
            <div className="registration">
                <Form onSubmit={this.register}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formConfirmedPassword">
                        <Form.Label>Confirm password</Form.Label>
                        <Form.Control
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm password"
                            value={this.state.confirmPassword}
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Registrate
                    </Button>
                </Form>
                <div className="alert-container">
                    <Alert show={this.state.isEmpty} variant="danger">
                        Please enter all necessary data
                    </Alert>
                    <Alert show={this.state.isDifferent} variant="danger">
                        Passwords are not the same
                    </Alert>
                    <Alert show={this.state.isError} variant="danger">
                        There is already user with such email!
                    </Alert>
                </div>
            </div>
        )
    }
}

export default withRouter(Registration);