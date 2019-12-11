import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import './Login.css';
import axios from 'axios';
import { validateField } from '../common/validate';
const url = require('../config.json').url;

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            show: false
        }

        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }


    async login(event) {
        // const response = await axios.post(url, this.state);
        if (!this.state.email || !this.state.password) {
            this.setState({
                show: true
            });
        }
        event.preventDefault();

        // TODO handle response
    }

    handleChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        validateField(name, value);
        this.setState({
            [name]: value,
            show: false
        });
    }

    render() {
        return (
            <div class="login">
                <Form onSubmit={this.login}>
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
                    <Button variant="primary" type="submit">
                        Log In
                    </Button>
                </Form>
                <div class="alert-container">
                    <Alert show={this.state.show} variant="danger">
                        Please enter all necessary data 
                    </Alert>
                </div>
            </div>
        )
    }
}

export default Login;