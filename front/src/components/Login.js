import React, {useState} from "react";
import {Form, Button} from "react-bootstrap";
import {useHistory} from 'react-router-dom';

const Login = () => {
    const [form, setForm] = useState({});
    const history = useHistory();


    return (<Form>
        <Form.Group>
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email"/>
            <Form.Text className="text-muted">
                We'll never share your email with anyone else.
            </Form.Text>
        </Form.Group>

        <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password"/>
        </Form.Group>
        <Button variant="primary">
            Login
        </Button>
        <Button variant="secondary" onClick={() => history.push('register')}>
            Register
        </Button>
    </Form>);
}

export default Login;
